import { IsNotEmpty, IsString } from 'class-validator';

export class HashDto {
  @IsString()
  @IsNotEmpty()
  hash: string;

  constructor(partial: Partial<HashDto>) {
    Object.assign(this, partial);
  }
}
