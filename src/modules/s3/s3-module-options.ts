import { S3ModuleAsyncOptions, S3ModuleOptions } from 'nestjs-s3';

import {
  S3_CONFIG_PROVIDER,
  S3ConfigType,
} from '../config/resources/s3-resource';

export const s3ModuleOptions: S3ModuleAsyncOptions = {
  inject: [S3_CONFIG_PROVIDER.KEY],
  useFactory: (s3Config: S3ConfigType): S3ModuleOptions => ({
    config: {
      region: s3Config.region,
      forcePathStyle: s3Config.forcePathStyle,
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
      },
      ...(s3Config.endpoint ? { endpoint: s3Config.endpoint } : {}),
    },
  }),
};
