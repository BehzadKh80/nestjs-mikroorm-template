import { RequestMethod } from '@nestjs/common';
import { LoggerModuleAsyncParams } from 'nestjs-pino';
import { IncomingMessage, ServerResponse } from 'http';

export const loggerModuleOption: LoggerModuleAsyncParams = {
  useFactory: () => {
    return {
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
        serializers: {
          req: (req: IncomingMessage) => {
            return {
              method: req.method,
              url: req.url,
            };
          },
          res: (res: ServerResponse) => {
            return {
              statusCode: res.statusCode,
            };
          },
        },
      },
      forRoutes: [{ path: '/{*splat}', method: RequestMethod.ALL }],
    };
  },
};
