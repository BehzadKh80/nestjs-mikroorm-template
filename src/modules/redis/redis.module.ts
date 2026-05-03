import { Module } from '@nestjs/common';
import { createClient } from 'redis';

import { REDIS_CLIENT } from './constants';
import {
  REDIS_CONFIG_PROVIDER,
  RedisConfigType,
} from '../config/resources/redis-resource';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async (redisConfig: RedisConfigType) => {
        const client = createClient({ url: redisConfig.url });
        await client.connect();
        return client;
      },
      inject: [REDIS_CONFIG_PROVIDER.KEY],
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
