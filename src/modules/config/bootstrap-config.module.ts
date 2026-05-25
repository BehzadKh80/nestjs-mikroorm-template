import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './config-module-options';
import { LoggerModule } from 'nestjs-pino';
import { loggerModuleOption } from '../logger/logger-module-options';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    LoggerModule.forRootAsync(loggerModuleOption),
  ],
})
export class BootstrapConfigModule {}
