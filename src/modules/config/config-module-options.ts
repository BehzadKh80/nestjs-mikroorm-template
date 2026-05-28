import { ConfigModuleOptions } from '@nestjs/config';
// <imports>
// <import name="NodeConfig">
import { NODE_CONFIG_PROVIDER } from './resources/node-resource';
// </import>
// <import name="AppConfig">
import { APP_CONFIG_PROVIDER } from './resources/app-resource';
// </import>
// <import name="SwaggerConfig">
import { SWAGGER_CONFIG_PROVIDER } from './resources/swagger-resource';
// </import>
// <import name="DatabaseConfig">
import { DATABASE_CONFIG_PROVIDER } from './resources/database-resource';
// </import>
// <import name="LogConfig">
import { LOG_CONFIG_PROVIDER } from './resources/log-resource';
// </import>
// <import name="RedisConfig">
import { REDIS_CONFIG_PROVIDER } from './resources/redis-resource';
// </import>
// <import name="SecurityConfig">
import { SECURITY_CONFIG_PROVIDER } from './resources/security-resource';
// </import>
// </imports>
export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [
    // <providers>
    // <provider name="AppConfig">
    APP_CONFIG_PROVIDER,
    // </provider>
    // <provider name="DatabaseConfig">
    DATABASE_CONFIG_PROVIDER,
    // </provider>
    // <provider name="LogConfig">
    LOG_CONFIG_PROVIDER,
    // </provider>
    // <provider name="NodeConfig">
    NODE_CONFIG_PROVIDER,
    // </provider>
    // <provider name="RedisConfig">
    REDIS_CONFIG_PROVIDER,
    // </provider>
    // <provider name="SecurityConfig">
    SECURITY_CONFIG_PROVIDER,
    // </provider>
    // <provider name="SwaggerConfig">
    SWAGGER_CONFIG_PROVIDER,
    // </provider>
    // </providers>
  ],
};
