import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { capitalCase } from 'change-case';

import { AppModule } from './modules/app/app.module';
import { NodeEnv } from './common/enums/node-env.enum';
import { getInitConfig } from './modules/config/helper';
// import expressSession from 'express-session';
// import cookieParser from 'cookie-parser';
// import { RedisStore } from './common/redis-store';
// import {
//   logOut,
//   isAuthenticated,
//   isUnauthenticated,
// } from './common/fastify-decorates';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
// import passport from 'passport';
// import { RedisStore } from 'connect-redis';
import { existsSync, mkdirSync } from 'fs';
import { STATIC_DIRECTORY } from './common/constants';
// import { RedisStore } from './common/redis-store';
// import { RedisStore } from 'connect-redis';
// import { doubleCsrf } from 'csrf-csrf';

async function bootstrap() {
  if (!existsSync(STATIC_DIRECTORY)) {
    mkdirSync(STATIC_DIRECTORY, { recursive: true });
  }

  const {
    appConfig,
    // cookieConfig,
    // csrfConfig,
    nodeConfig,
    // sessionConfig,
    swaggerConfig,
  } = await getInitConfig();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    // new FastifyAdapter({
    //   trustProxy: appConfig.trustProxy,
    //   logger: true,
    // }),
    {
      bufferLogs: true,
    },
  );
  app.disable('x-powered-by');
  app.set('trust proxy', true);
  // const isProduction = nodeConfig.env === NodeEnv.PRODUCTION;
  const logger = app.get(Logger);
  app.useLogger(logger);

  // const redisClient: RedisClientType = app.get(REDIS_CLIENT);
  // app.flushLogs();
  // await app.register(fastifyHelmet);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );

  app.enableCors({
    // origin: isProduction ? ['https://mehrschoolapp.ir'] : '*',
    // credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    // exposedHeaders: ['Set-Cookie'],
    // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  if (appConfig.enableVersion) {
    app.enableVersioning({
      type: VersioningType.URI,
      prefix: 'v',
      defaultVersion: appConfig.version.split('.').shift(),
    });
  }

  if (appConfig.enableGloablPrefix) {
    app.setGlobalPrefix(appConfig.globalPrefix);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      // ---- Security & Sanitization ----
      whitelist: true, // Strip properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if extra properties are sent
      //forbidUnknownValues: true, // Reject objects without validation decorators

      // ---- Transformation ----
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // e.g., string "1" → number 1 in DTO typed as number
      },

      // ---- Performance & Error Handling ----
      stopAtFirstError: true, // Stop after the first validation error (saves CPU)
      validationError: {
        target: false, // Do not expose the full object in validation errors
        value: false, // Do not expose input values in validation errors
      },

      // ---- Custom Error Messages (Production) ----
      // Replace detailed field errors with a generic message, while logging internally
      // exceptionFactory: (errors: ValidationError[]) => {
      //   // Log the full validation errors (never include in the response)
      //   console.error(
      //     'Validation errors:',
      //     JSON.stringify(errors, undefined, 2),
      //   );

      //   // Return a single generic BadRequestException (safe for production)
      //   //return new BadRequestException('Invalid request data');
      // },
    }),
  );
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // const fastify = app.getHttpAdapter().getInstance();
  // fastify.decorateRequest('logOut', logOut);
  // fastify.decorateRequest('isAuthenticated', isAuthenticated);
  // fastify.decorateRequest('isUnauthenticated', isUnauthenticated);

  // app.use(passport.initialize());
  // app.use(passport.session());

  const appTitle = capitalCase(appConfig.name);
  if (swaggerConfig.enable) {
    const config = new DocumentBuilder()
      .setTitle(appTitle)
      .setVersion(appConfig.enableVersion ? appConfig.version : '')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(swaggerConfig.path, app, documentFactory, {
      swaggerOptions: {
        persistAuthorization: true,
        withCredentials: true,
      },
    });
  }
  await app.listen(appConfig.port, appConfig.host, () => {
    // if (err) {
    //   logger.error(err);
    //   throw err;
    // }
    const host =
      nodeConfig.env === NodeEnv.DEVELOPMENT ? 'localhost' : appConfig.host;
    logger.log(`${appTitle} v${appConfig.version} is running`, {
      base: `http://${host}:${appConfig.port}`,
      swagger: `http://${host}:${appConfig.port}/${swaggerConfig.path}`,
      static: `http://${host}:${appConfig.port}/static`,
    });
  });
}

bootstrap()
  .then(() => {})
  .catch((e) => {
    throw e;
  });
