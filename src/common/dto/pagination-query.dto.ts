import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    name: 'page',
    type: 'integer',
    default: 1,
    minimum: 1,
  })
  @Expose({ name: 'page' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    name: 'per_page',
    type: 'integer',
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @Expose({ name: 'per_page' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  perPage: number = 20;
}
