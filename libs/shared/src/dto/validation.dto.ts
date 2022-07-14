import { IsNotEmpty, IsString } from 'class-validator';

export class ValidationDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  hash: string;

  constructor(partial: Partial<ValidationDto>) {
    Object.assign(this, partial);
  }
}
