import { Inject } from '@nestjs/common';
import { PASSWORD_HASHER } from '../constants';

export const InjectPasswordHasher = () => {
  return Inject(PASSWORD_HASHER);
};
