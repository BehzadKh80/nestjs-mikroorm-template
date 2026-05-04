import { ClsModuleAsyncOptions } from 'nestjs-cls';
import { Request } from 'express';
import { v7 } from 'uuid';

export const clsOptions: ClsModuleAsyncOptions = {
  useFactory: () => {
    return {
      middleware: {
        mount: true,
        setup: (cls, req: Request) => {
          let requestId: string | undefined = req.res?.getHeader(
            'x-request-id',
          ) as unknown as string | undefined;
          if (!requestId) {
            requestId = v7();
            req.res?.setHeader('x-request-id', requestId);
          }
          cls.set('requestId', requestId);
        },
      },
    };
  },
  global: true,
};
