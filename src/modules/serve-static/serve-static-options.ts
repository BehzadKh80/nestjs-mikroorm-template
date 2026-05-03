import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static';
import { STATIC_DIRECTORY } from '../../common/constants';

export const serveStaticOptions: ServeStaticModuleAsyncOptions = {
  useFactory: () => {
    return [
      {
        rootPath: STATIC_DIRECTORY,
        serveRoot: '/static',
      },
    ];
  },
};
