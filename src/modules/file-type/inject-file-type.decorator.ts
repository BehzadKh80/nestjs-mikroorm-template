import { Inject } from '@nestjs/common';
import { FILE_TYPE_PACKAGE } from './constants';

export const InjectFileType = () => {
  return Inject(FILE_TYPE_PACKAGE);
};
