import { SharedBullAsyncConfiguration } from '@nestjs/bullmq';
import {
  REDIS_CONFIG_PROVIDER,
  RedisConfigType,
} from '../config/resources/redis-resource';

export const bullmqModuleOptions: SharedBullAsyncConfiguration = {
  inject: [REDIS_CONFIG_PROVIDER.KEY],
  useFactory: (redisConfig: RedisConfigType) => {
    return {
      connection: {
        url: redisConfig.url,
      },
    };
  },
};
