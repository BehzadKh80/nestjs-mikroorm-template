import 'dotenv/config';

import { defineConfig } from '@mikro-orm/postgresql';
import { createConfig } from './modules/orm/orm-module-config';
import { NodeEnv } from './common/enums/node-env.enum';

const mikroOrmConfig = defineConfig({
  ...createConfig({
    host: process.env['DATABASE__HOST'] ?? '0.0.0.0',
    port: parseInt(process.env['DATABASE__PORT'] ?? '3000'),
    username: process.env['DATABASE__USERNAME'] ?? 'postgres',
    password: process.env['DATABASE__PASSWORD'] ?? 'secret',
    name: process.env['DATABASE__NAME'] ?? 'example',
    schema: process.env['DATABASE__SCHEMA'] ?? 'public',
    nodeEnv: process.env['NODE_ENV']
      ? (process.env['NODE_ENV'] as unknown as NodeEnv)
      : NodeEnv.PRODUCTION,
  }),
});

export default mikroOrmConfig;
