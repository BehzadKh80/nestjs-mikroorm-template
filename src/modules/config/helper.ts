import { NestFactory } from '@nestjs/core';
// import { Logger } from 'nestjs-pino';
import { BootstrapConfigModule } from './bootstrap-config.module';

// import { COOKIE_CONFIG_PROVIDER } from './resources/cookie/cookie-config.provider';
// import { CookieConfigType } from './resources/cookie/cookie-config.type';
// import { CSRF_CONFIG_PROVIDER } from './resources/csrf/csrf-config.provider';
// import { CsrfConfigType } from './resources/csrf/csrf-config.type';

// import { SESSION_CONFIG_PROVIDER } from './resources/session/session-config.provider';
// import { SessionConfigType } from './resources/session/session-config.type';

import { Logger } from 'nestjs-pino';
import { APP_CONFIG_PROVIDER, AppConfigType } from './resources/app-resource';
import {
  NODE_CONFIG_PROVIDER,
  NodeConfigType,
} from './resources/node-resource';
import {
  SWAGGER_CONFIG_PROVIDER,
  SwaggerConfigType,
} from './resources/swagger-resource';

export async function getInitConfig() {
  const config = await NestFactory.createApplicationContext(
    BootstrapConfigModule,
    { bufferLogs: true },
  );
  config.useLogger(config.get(Logger));

  const appConfig: AppConfigType = config.get(APP_CONFIG_PROVIDER.KEY);
  const nodeConfig: NodeConfigType = config.get(NODE_CONFIG_PROVIDER.KEY);
  const swaggerConfig: SwaggerConfigType = config.get(
    SWAGGER_CONFIG_PROVIDER.KEY,
  );
  // const cookieConfig: CookieConfigType = config.get(COOKIE_CONFIG_PROVIDER.KEY);
  // const csrfConfig: CsrfConfigType = config.get(CSRF_CONFIG_PROVIDER.KEY);
  // const sessionConfig: SessionConfigType = config.get(
  //   SESSION_CONFIG_PROVIDER.KEY,
  // );

  await config.close();
  return {
    appConfig,
    nodeConfig,
    swaggerConfig,
    // cookieConfig,
    // csrfConfig,
    // sessionConfig,
  };
}
