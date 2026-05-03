import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { BullModule } from '@nestjs/bullmq';
// import { ClsModule } from 'nestjs-cls';
// import { I18nModule } from 'nestjs-i18n';
// import { LoggerModule } from 'nestjs-pino';
import configModuleOptions from '../config/config-module-options';
import { loggerModuleOption } from '../logger/logger-module-options';
import { LoggerModule } from 'nestjs-pino';
import { I18nModule } from 'nestjs-i18n';
import { i18nOptions } from '../i18n/i18n-options';
import { ClsModule } from 'nestjs-cls';
import { clsOptions } from '../cls/cls-options';
import { serveStaticOptions } from '../serve-static/serve-static-options';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BullModule } from '@nestjs/bullmq';
import { bullmqModuleOptions } from '../bullmq/bullmq-module-options';
import { RedisModule } from '../redis/redis.module';
import { HashModule } from '../hash/hash.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ormModuleConfig } from '../orm/orm-module-config';
import { HealthModule } from '../health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    LoggerModule.forRootAsync(loggerModuleOption),
    I18nModule.forRootAsync(i18nOptions),
    ClsModule.forRootAsync(clsOptions),
    ServeStaticModule.forRootAsync(serveStaticOptions),
    BullModule.forRootAsync(bullmqModuleOptions),
    RedisModule,
    MikroOrmModule.forRootAsync(ormModuleConfig),
    HealthModule,
    HashModule,
  ],
})
export class AppModule {}
