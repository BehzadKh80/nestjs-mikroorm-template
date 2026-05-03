export interface PasswordHasher {
  length: number;

  hash(password: string): Promise<string>;
  verify(digest: string, password: string): Promise<boolean>;
}
