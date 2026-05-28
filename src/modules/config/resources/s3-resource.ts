import { ConfigType } from '@nestjs/config';
import { Expose, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  createValidatedConfig,
  transformBoolean,
  transformString,
} from '../../../common/helper/functions';

export class S3Config {
  // <properties>
  // <property name="region">
  @Expose({ name: 'S3__REGION' })
  @Transform(({ value }) => transformString(value, 'us-east-1'))
  @IsString()
  region!: string;
  // </property>
  // <property name="endpoint">
  @Expose({ name: 'S3__ENDPOINT' })
  @IsOptional()
  @IsString()
  endpoint?: string;
  // </property>
  // <property name="accessKeyId">
  @Expose({ name: 'S3__ACCESS_KEY_ID' })
  @IsNotEmpty()
  @IsString()
  accessKeyId!: string;
  // </property>
  // <property name="secretAccessKey">
  @Expose({ name: 'S3__SECRET_ACCESS_KEY' })
  @IsNotEmpty()
  @IsString()
  secretAccessKey!: string;
  // </property>
  // <property name="bucket">
  @Expose({ name: 'S3__BUCKET' })
  @IsNotEmpty()
  @IsString()
  bucket!: string;
  // </property>
  // <property name="forcePathStyle">
  @Expose({ name: 'S3__FORCE_PATH_STYLE' })
  @Transform(({ value }) => transformBoolean(value, false))
  @IsBoolean()
  forcePathStyle!: boolean;
  // </property>
  // </properties>
}

export const S3_CONFIG_PROVIDER = createValidatedConfig('s3', S3Config);

export type S3ConfigType = ConfigType<typeof S3_CONFIG_PROVIDER>;
