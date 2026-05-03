import { MikroORM } from '@mikro-orm/core';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class HealthService implements OnApplicationBootstrap {
  constructor(private readonly orm: MikroORM) {}

  async onApplicationBootstrap() {
    if (!(await this.orm.isConnected())) {
      await this.orm.connect();
    }
  }
}
