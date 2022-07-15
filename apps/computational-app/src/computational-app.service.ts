import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class ComputationalAppService {
  constructor(private readonly configService: ConfigService) {}

  hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      ...this.configService.get<argon2.Options>('app.argon2'),
      raw: false,
    });
  }

  async validatePassword(plain: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, plain);
    } catch {
      return false;
    }
  }
}
