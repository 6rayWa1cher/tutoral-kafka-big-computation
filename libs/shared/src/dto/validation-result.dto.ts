import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ValidationResultDto {
  @IsBoolean()
  @IsNotEmpty()
  valid: boolean;

  constructor(partial: Partial<ValidationResultDto>) {
    Object.assign(this, partial);
  }
}
