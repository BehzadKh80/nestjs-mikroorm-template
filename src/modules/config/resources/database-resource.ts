import { ConfigType } from '@nestjs/config';
import {
  createValidatedConfig,
  transformString,
} from '../../../common/helper/functions';
import { Expose, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { IpOrFqdn } from '../../../common/validators/ip-or-fqdn';

export class DatabaseConfig {
  @Expose({ name: 'DATABASE__HOST' })
  @Validate(IpOrFqdn)
  host!: string;

  @Expose({ name: 'DATABASE__PORT' })
  @IsNumber()
  @Min(0)
  @Max(65535)
  port!: number;

  @Expose({ name: 'DATABASE__USERNAME' })
  @IsOptional()
  @IsString()
  username?: string;

  @Expose({ name: 'DATABASE__PASSWORD' })
  @IsOptional()
  @IsString()
  password?: string;

  @Expose({ name: 'DATABASE__NAME' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Expose({ name: 'DATABASE__SCHEMA' })
  @Transform(({ value }) => transformString(value, 'public'))
  @IsOptional()
  @IsString()
  schema?: string;
  // synchronize!: boolean;
  // logging?: 'all' | DatabaseLogging[];
}

export const DATABASE_CONFIG_PROVIDER = createValidatedConfig(
  'database',
  DatabaseConfig,
);

export type DatabaseConfigType = ConfigType<typeof DATABASE_CONFIG_PROVIDER>;
