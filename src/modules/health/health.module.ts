import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { RedisHealthIndicator } from './health-indicators/redis-health-indicator';
import { RedisModule } from '../redis/redis.module';
import { HealthService } from './health.service';

@Module({
  imports: [TerminusModule, RedisModule],
  controllers: [HealthController],
  providers: [RedisHealthIndicator, HealthService],
})
export class HealthModule {}
