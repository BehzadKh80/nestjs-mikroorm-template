import { ConfigModuleOptions } from '@nestjs/config';
import { NODE_CONFIG_PROVIDER } from './resources/node-resource';
import { APP_CONFIG_PROVIDER } from './resources/app-resource';
import { SWAGGER_CONFIG_PROVIDER } from './resources/swagger-resource';
import { DATABASE_CONFIG_PROVIDER } from './resources/database-resource';
import { LOG_CONFIG_PROVIDER } from './resources/log-resource';
import { REDIS_CONFIG_PROVIDER } from './resources/redis-resource';
import { SECURITY_CONFIG_PROVIDER } from './resources/security-resource';
export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [
    APP_CONFIG_PROVIDER,
    DATABASE_CONFIG_PROVIDER,
    LOG_CONFIG_PROVIDER,
    NODE_CONFIG_PROVIDER,
    REDIS_CONFIG_PROVIDER,
    SECURITY_CONFIG_PROVIDER,
    SWAGGER_CONFIG_PROVIDER,
  ],
};
