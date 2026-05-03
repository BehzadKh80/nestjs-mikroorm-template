import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MikroOrmHealthIndicator,
} from '@nestjs/terminus';
import { RedisHealthIndicator } from './health-indicators/redis-health-indicator';
import type { RedisClientType } from 'redis';
import { InjectRedisClient } from '../redis/decorators/inject-redis-client.decorator';
import { Get, Inject, Req } from '@nestjs/common';

import { NodeEnv } from '../../common/enums/node-env.enum';
import { ApiController } from '../../common/decorators/api-controller.decorator';
import { NODE_CONFIG_PROVIDER } from '../config/resources/node-resource';
import type { NodeConfigType } from '../config/resources/node-resource';
import type { Request } from 'express';

@ApiController({ options: 'health' })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: MikroOrmHealthIndicator,
    private readonly redis: RedisHealthIndicator,
    @InjectRedisClient()
    private readonly redisClient: RedisClientType,
    @Inject(NODE_CONFIG_PROVIDER.KEY)
    private readonly nodeConfig: NodeConfigType,
  ) {}

  @Get()
  @HealthCheck()
  async check(@Req() req: Request): Promise<HealthCheckResult | null> {
    const result = this.health.check([
      () => this.db.pingCheck('database'),
      () =>
        this.redis.pingCheck('redis', {
          type: 'redis',
          client: this.redisClient,
        }),
    ]);
    if (this.nodeConfig.env === NodeEnv.PRODUCTION) {
      return req.ip === 'localhost' || req.ip === '127.0.0.1' ? result : null;
    }
    return result;
  }
}
