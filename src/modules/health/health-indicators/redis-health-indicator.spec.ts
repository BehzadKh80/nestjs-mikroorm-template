import { Test, TestingModule } from '@nestjs/testing';
import { RedisHealthIndicator } from './redis-health-indicator';

describe('RedisHealthIndicator', () => {
  let provider: RedisHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisHealthIndicator],
    }).compile();

    provider = module.get<RedisHealthIndicator>(RedisHealthIndicator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
