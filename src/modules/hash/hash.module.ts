import { Module } from '@nestjs/common';
import { PasswordHasher } from './interfaces/password-hasher.interface';
import { HashStrategy } from './enums/hash.strategy.enum';
import { Argon2PasswordHasher } from './strategies/argon2-password-hasher';
import {
  SECURITY_CONFIG_PROVIDER,
  SecurityConfigType,
} from '../config/resources/security-resource';

@Module({
  providers: [
    {
      provide: 'PASSWORD_HASHER',
      useFactory: (securityConfig: SecurityConfigType): PasswordHasher => {
        if (securityConfig.hash === HashStrategy.ARGON2) {
          return new Argon2PasswordHasher();
        } else {
          throw new Error('This password hash algorithm not support');
        }
      },
      inject: [SECURITY_CONFIG_PROVIDER.KEY],
    },
  ],
  exports: ['PASSWORD_HASHER'],
})
export class HashModule {}
