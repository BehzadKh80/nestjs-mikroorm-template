import { Expose, Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { createValidatedConfig } from '../../../common/helper/functions';
import { ConfigType } from '@nestjs/config';
import { HashStrategy } from '../../hash/enums/hash.strategy.enum';

export class SecurityConfig {
  @Expose({ name: 'SECURITY__HASH' })
  @Transform(({ value }): any => value ?? HashStrategy.ARGON2)
  @IsEnum(HashStrategy)
  hash!: HashStrategy;
}
export const SECURITY_CONFIG_PROVIDER = createValidatedConfig(
  'security',
  SecurityConfig,
);
export type SecurityConfigType = ConfigType<typeof SECURITY_CONFIG_PROVIDER>;
