import { Expose, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsSemVer,
  IsString,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { BooleanOrString } from '../../../common/validators/boolean-or-string';
import { IpOrFqdn } from '../../../common/validators/ip-or-fqdn';
import { createValidatedConfig } from '../../../common/helper/functions';
import { ConfigType } from '@nestjs/config';

export class AppConfig {
  @Expose({ name: 'APP__HOST' })
  @Transform(({ value }) => value ?? '0.0.0.0')
  @IsString()
  @Validate(IpOrFqdn)
  host!: string;

  @Expose({ name: 'APP__PORT' })
  @Transform(({ value }) => value ?? 3000)
  @IsNumber()
  @Min(0)
  @Max(65535)
  port!: number;

  @Expose({ name: 'APP__NAME' })
  @Transform(({ value }) => value ?? 'NestJS-MikroOrm-Template')
  @IsString()
  name!: string;

  @Expose({ name: 'APP__VERSION' })
  @Transform(({ value }) => value ?? '1.0.0')
  @IsString()
  @IsSemVer()
  version!: `${number}.${number}.${number}`;

  @Expose({ name: 'APP__TRUST_PROXY' })
  @Transform(({ value }) => value ?? true)
  @Validate(BooleanOrString)
  trustProxy!: boolean | string;

  @Expose({ name: 'APP__ENABLE_GLOBAL_PREFIX' })
  @Transform(({ value }) => value ?? true)
  @IsBoolean()
  enableGloablPrefix!: boolean;

  @Expose({ name: 'APP__GLOBAL_PREFIX' })
  @Transform(({ value }) => value ?? 'api')
  @IsString()
  globalPrefix!: string;

  @Expose({ name: 'APP__ENABLE_VERSION' })
  @Transform(({ value }) => value ?? true)
  @IsBoolean()
  enableVersion!: boolean;
}

export const APP_CONFIG_PROVIDER = createValidatedConfig('app', AppConfig);
export type AppConfigType = ConfigType<typeof APP_CONFIG_PROVIDER>;
