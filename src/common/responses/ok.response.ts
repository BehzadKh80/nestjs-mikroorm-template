import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OkResponse {
  @ApiProperty({
    type: 'boolean',
    default: true,
  })
  @Expose({ name: 'is_success' })
  public readonly isSuccess = true;

  @ApiProperty({
    type: 'integer',
    default: HttpStatus.OK,
  })
  public readonly status: number = HttpStatus.OK;
  constructor() {}
}
