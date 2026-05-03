import { ClsModuleAsyncOptions } from 'nestjs-cls';
import { Request } from 'express';
import { randomUUID } from 'crypto';

export const clsOptions: ClsModuleAsyncOptions = {
  useFactory: () => {
    return {
      middleware: {
        mount: true,
        setup: (cls, req: Request) => {
          const requestId = req.headers['x-request-id'] ?? randomUUID();
          cls.set('requestId', requestId);
          req.res?.setHeader('x-request-id', requestId);
        },
      },
    };
  },
};
