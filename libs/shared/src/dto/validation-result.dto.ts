import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ValidationResultDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  valid: boolean;

  constructor(partial: Partial<ValidationResultDto>) {
    Object.assign(this, partial);
  }
}
