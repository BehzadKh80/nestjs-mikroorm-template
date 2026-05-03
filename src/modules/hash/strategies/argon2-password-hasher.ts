import { PasswordHasher } from '../interfaces/password-hasher.interface';
import argon2 from 'argon2';

export class Argon2PasswordHasher implements PasswordHasher {
  length: number = 96;

  hash(password: string): Promise<string> {
    return argon2.hash(password, { type: argon2.argon2i });
  }

  verify(digest: string, password: string): Promise<boolean> {
    return argon2.verify(digest, password);
  }
}
