import { ConfigType } from '@nestjs/config';
import { createValidatedConfig } from '../../../common/helper/functions';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsEnum } from 'class-validator';
import { LogLevel } from '../../../common/enums/log-level.enum';

export class LogConfig {
  @Expose({ name: 'LOG__LEVEL' })
  @Transform(({ value }): any => value ?? LogLevel.INFO)
  @IsEnum(LogLevel)
  level!: LogLevel;

  @Expose({ name: 'LOG__ENABLE' })
  @Transform(({ value }): any => value ?? true)
  @IsBoolean()
  enable!: boolean;
}

export const LOG_CONFIG_PROVIDER = createValidatedConfig('log', LogConfig);
export type LogConfigType = ConfigType<typeof LOG_CONFIG_PROVIDER>;
