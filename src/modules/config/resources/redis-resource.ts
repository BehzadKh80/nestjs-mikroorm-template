import { ConfigType } from '@nestjs/config';
import { createValidatedConfig } from '../../../common/helper/functions';
import { IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';

export class RedisConfig {
  @Expose({ name: 'REDIS__URL' })
  @IsUrl({ protocols: ['redis'] })
  url!: string;
}
export const REDIS_CONFIG_PROVIDER = createValidatedConfig(
  'redis',
  RedisConfig,
);
export type RedisConfigType = ConfigType<typeof REDIS_CONFIG_PROVIDER>;
