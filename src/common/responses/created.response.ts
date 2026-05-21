import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatedResponse {
  @ApiProperty({
    type: 'boolean',
    default: true,
  })
  @Expose({ name: 'is_success' })
  public readonly isSuccess = true;

  @ApiProperty({
    type: 'integer',
    default: HttpStatus.CREATED,
  })
  public readonly status: number = HttpStatus.CREATED;
  constructor() {}
}
