import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HashDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hash: string;

  constructor(partial: Partial<HashDto>) {
    Object.assign(this, partial);
  }
}
