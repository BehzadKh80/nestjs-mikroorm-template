import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;

  @ApiPropertyOptional({ name: 'first_name' })
  @Expose({ name: 'first_name' })
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @ApiPropertyOptional({ name: 'last_name' })
  @Expose({ name: 'last_name' })
  @IsOptional()
  @MinLength(3)
  lastName?: string;
}
