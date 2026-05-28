import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationMeta {
  @ApiProperty({ name: 'total', type: 'integer' })
  @Expose({ name: 'total' })
  total!: number;

  @ApiProperty({ name: 'per_page', type: 'integer' })
  @Expose({ name: 'per_page' })
  perPage!: number;

  @ApiProperty({ name: 'first_page', type: 'integer' })
  @Expose({ name: 'first_page' })
  firstPage!: number;

  @ApiProperty({ name: 'current_page', type: 'integer' })
  @Expose({ name: 'current_page' })
  currentPage!: number;

  @ApiProperty({ name: 'last_page', type: 'integer' })
  @Expose({ name: 'last_page' })
  lastPage!: number;

  constructor(total: number, currentPage: number, perPage: number) {
    this.total = total;
    this.perPage = perPage;
    this.currentPage = currentPage;
    this.firstPage = 1;
    this.lastPage = Math.max(1, Math.ceil(total / perPage));
  }
}
