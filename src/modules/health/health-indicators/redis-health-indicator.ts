import { Injectable } from '@nestjs/common';
import {
  HealthIndicatorResult,
  HealthIndicatorService,
} from '@nestjs/terminus';
import { RedisClientType, RedisClusterType } from 'redis';
import {
  isNullish,
  parseUsedMemory,
  promiseTimeout,
  removeLineBreaks,
} from '../../../common/helper/functions';

@Injectable()
export class RedisHealthIndicator {
  constructor(
    private readonly healthIndicatorService: HealthIndicatorService,
  ) {}
  async pingCheck(
    key: string,
    options:
      | {
          type: 'redis';
          client: RedisClientType;
          timeout?: number;
          memoryThreshold?: number;
        }
      | {
          type: 'cluster';
          client: RedisClusterType;
        },
  ): Promise<HealthIndicatorResult> {
    const indicator = this.healthIndicatorService.check(key);
    const { type, client } = options;
    if (type !== 'redis' && type !== 'cluster')
      throw new Error(
        `Argument "type" is invalid. Expected one of: "redis", "cluster".`,
      );

    try {
      if (type === 'redis') {
        await promiseTimeout(options.timeout ?? 1000, client.ping());
        if (!isNullish(options.memoryThreshold)) {
          const info = await client.info('memory');
          if (
            parseUsedMemory(removeLineBreaks(info)) > options.memoryThreshold
          ) {
            throw new Error(`The client is using abnormally high memory.`);
          }
        }
      } else {
        const clusterInfo: string = await client.sendCommand('INFO', false, []);
        if (typeof clusterInfo === 'string') {
          if (!clusterInfo.includes('cluster_state:ok'))
            throw new Error(`INFO CLUSTER is not on OK state.`);
        } else throw new Error(`INFO CLUSTER is null or can't be read.`);
      }
    } catch (e) {
      const { message } = e as Error;
      return indicator.down({ message });
    }
    return indicator.up();
  }
}
