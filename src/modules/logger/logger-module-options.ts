import { LoggerModuleAsyncParams } from 'nestjs-pino';
import { IncomingMessage, ServerResponse } from 'http';
import {
  NODE_CONFIG_PROVIDER,
  NodeConfigType,
} from '../config/resources/node-resource';
import { NodeEnv } from '../../common/enums/node-env.enum';
import { v7 } from 'uuid';

export const loggerModuleOption: LoggerModuleAsyncParams = {
  useFactory: (nodeConfig: NodeConfigType) => {
    return {
      pinoHttp: {
        genReqId: (_: IncomingMessage, res: ServerResponse) => {
          let requestId: string | undefined = res.getHeader(
            'x-request-id',
          ) as unknown as string | undefined;
          if (!requestId) {
            requestId = v7();
            res?.setHeader('x-request-id', requestId);
          }
          return requestId;
        },
        serializers: {
          req: (req: IncomingMessage) => {
            return {
              method: req.method,
              url: req.url,
              id: req.id,
            };
          },
          res: (res: ServerResponse) => {
            return {
              statusCode: res.statusCode,
            };
          },
        },
        ...(nodeConfig.env === NodeEnv.PRODUCTION
          ? {}
          : {
              transport: {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                },
              },
            }),
      },
    };
  },
  inject: [NODE_CONFIG_PROVIDER.KEY],
};
