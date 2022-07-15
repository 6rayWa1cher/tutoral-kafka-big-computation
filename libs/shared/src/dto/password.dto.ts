import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  constructor(partial: Partial<PasswordDto>) {
    Object.assign(this, partial);
  }
}
