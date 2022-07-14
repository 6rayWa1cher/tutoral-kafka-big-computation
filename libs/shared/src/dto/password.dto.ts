import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(partial: Partial<PasswordDto>) {
    Object.assign(this, partial);
  }
}
