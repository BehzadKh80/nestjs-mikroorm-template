import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import {
  DATABASE_CONFIG_PROVIDER,
  DatabaseConfigType,
} from '../config/resources/database-resource';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
// import { Logger } from '@nestjs/common';
import { NodeEnv } from '../../common/enums/node-env.enum';
import {
  NODE_CONFIG_PROVIDER,
  NodeConfigType,
} from '../config/resources/node-resource';
import { Migrator } from '@mikro-orm/migrations';

export function createConfig(common: {
  host: string;
  port: number | undefined | null;
  username: string | undefined | null;
  password: string | undefined | null;
  name: string;
  schema?: string | undefined | null;
  nodeEnv: NodeEnv;
}): Options {
  const options: Options = {
    // ── Driver ───────────────────────────────────────────────
    driver: PostgreSqlDriver,

    // ── Connection ──────────────────────────────────────────
    host: common.host,
    port: common.port ?? 5432,
    user: common.username ?? '',
    password: common.password ?? '',
    dbName: common.name,
    schema: common.schema ?? 'public',
    // SSL is mandatory for production database connections.
    // For cloud providers (AWS RDS, GCP Cloud SQL, etc.) use `rejectUnauthorized: true`
    // with the correct CA certificate if needed. In development you can set to false.
    // driverOptions: {
    //   connection: {
    //     ssl:
    //       process.env.DB_SSL === 'true'
    //         ? {
    //             rejectUnauthorized:
    //               process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
    // If required, provide CA certificate via file path or raw string:
    // ca: process.env.DB_CA_CERT,
    //           }
    //         : false,
    //   },
    // },

    // ── Connection pool (recommended for production) ─────────
    pool: {
      min: 2, // keep at least 2 idle connections
      max: 10, // maximum simultaneous connections
      // acquireTimeoutMillis: 30000, // 30s to acquire a connection from the pool
      idleTimeoutMillis: 30000, // close idle connections after 30s
      // reapIntervalMillis: 1000, // check for idle connections every second
    },

    // ── Discovery ───────────────────────────────────────────
    // For production, load compiled entities from /dist.
    // Use `entitiesTs` only in development (passed via environment).
    entities: ['./dist/modules/**/entities/*.entity.js'],
    entitiesTs: ['./src/modules/**/entities/*.entity.ts'], // will be ignored if `entities` is set and files exist

    // Use ts-morph for reflection: faster and more accurate in TypeScript projects.
    // metadataProvider: TsMorphMetadataProvider,

    // Disable automatic discovery in production (use explicit `entities`)
    discovery: {
      warnWhenNoEntities: false,
      // requireEntitiesArray: true,
      // Disable runtime discovery of new entities to avoid unnecessary file scanning
      // alwaysAnalyseProperties: false,
      // disableDynamicFileAccess: true,
    },

    // ── Debug & logging ─────────────────────────────────────
    debug: common.nodeEnv !== NodeEnv.PRODUCTION, // enable query logging in non‑prod

    // ── Migrations ──────────────────────────────────────────
    migrations: {
      tableName: 'migrations', // store migration state in this table
      path: './dist/modules/orm/migrations', // path to compiled migration files in production
      pathTs: './src/modules/orm/migrations', // path to TypeScript migration files (dev)
      // glob: '!(*.d).{js,ts}', // files to match
      transactional: true, // wrap each migration in a transaction
      // disableForeignKeys: true, // drop FK constraints during migration (safer for Postgres)
      // allOrNothing: true, // make migrations atomic (Postgres only)
      // dropTables: false, // never drop tables automatically
      // safe: false, // allow irreversible migrations
      // snapshot: true, // save a schema snapshot to speed up diffing
    },

    // ── Caching ─────────────────────────────────────────────
    // By default MikroORM uses an in-memory identity map.
    // For better performance enable result caching:
    // resultCache: {
    // adapter: 'memory', // use 'redis' for distributed caching in multi-node apps
    //   expiration: 5000, // cache results for 5 seconds
    // },

    // ── Misc production hardening ───────────────────────────
    // Force UTC timezone (prevents timezone discrepancies)
    timezone: 'UTC',

    // Never auto-flush in production – always call em.flush() explicitly.
    // autoFlush: false,

    // Ensure strict mode to catch type mismatches early.
    // strict: true,

    // Use snake_case for database columns (if your schema follows that convention)
    // namingStrategy: EntityCaseNamingStrategy,

    extensions: [Migrator],
    allowGlobalContext: Boolean(process.env['ORM_GLOBAL_CONTEXT']),
  };

  return options;
}

export const ormModuleConfig: MikroOrmModuleAsyncOptions = {
  useFactory: (
    databaseConfig: DatabaseConfigType,
    nodeConfig: NodeConfigType,
  ) => {
    return {
      ...createConfig({
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.username,
        password: databaseConfig.password,
        name: databaseConfig.name,
        schema: databaseConfig.schema,
        nodeEnv: nodeConfig.env,
      }),
      // autoLoadEntities: true,
      allowGlobalContext: process.env['ORM_GLOBAL_CONTEXT'] === 'true',
    };
  },
  inject: [DATABASE_CONFIG_PROVIDER.KEY, NODE_CONFIG_PROVIDER.KEY],
  driver: PostgreSqlDriver,
};
