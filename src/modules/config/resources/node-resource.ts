import { Expose, Transform } from 'class-transformer';
import { NodeEnv } from '../../../common/enums/node-env.enum';
import { IsEnum } from 'class-validator';
import { createValidatedConfig } from '../../../common/helper/functions';
import { ConfigType } from '@nestjs/config';

export class NodeConfig {
  @Expose({ name: 'NODE_ENV' })
  @Transform(({ value }): any => value ?? NodeEnv.PRODUCTION)
  @IsEnum(NodeEnv)
  env!: NodeEnv;
}
export const NODE_CONFIG_PROVIDER = createValidatedConfig('node', NodeConfig);
export type NodeConfigType = ConfigType<typeof NODE_CONFIG_PROVIDER>;
