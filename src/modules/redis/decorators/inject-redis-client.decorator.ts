import { Inject } from '@nestjs/common';
import { REDIS_CLIENT } from '../constants';

export const InjectRedisClient = () => {
  return Inject(REDIS_CLIENT);
};
