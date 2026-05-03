import { Module } from '@nestjs/common';
import { FILE_TYPE_PACKAGE } from './constants';
import { TFileType } from './types';

@Module({
  providers: [
    {
      provide: FILE_TYPE_PACKAGE,
      useFactory: async (): Promise<TFileType> => {
        const fileType = await import('file-type');
        return fileType;
      },
    },
  ],
  exports: [FILE_TYPE_PACKAGE],
})
export class FileTypeModule {}
