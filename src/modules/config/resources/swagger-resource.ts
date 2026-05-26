import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { createValidatedConfig } from '../../../common/helper/functions';
import { ConfigType } from '@nestjs/config';

export class SwaggerConfig {
  @Expose({ name: 'SWAGGER__ENABLE' })
  @Transform(({ value }): any => value ?? false)
  @IsBoolean()
  enable!: boolean;

  @Expose({ name: 'SWAGGER__PATH' })
  @Transform(({ value }): any => value ?? 'docs')
  @IsString()
  path!: string;
}

export const SWAGGER_CONFIG_PROVIDER = createValidatedConfig(
  'swagger',
  SwaggerConfig,
);
export type SwaggerConfigType = ConfigType<typeof SWAGGER_CONFIG_PROVIDER>;
