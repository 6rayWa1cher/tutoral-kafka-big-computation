import {
  AUTH_COMPARE_HASH_TOPIC,
  AUTH_GEN_HASH_TOPIC,
  HashDto,
  PasswordDto,
  ValidationDto,
  ValidationResultDto,
} from '@app/shared';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('KAFKA_SERVICE') private client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(AUTH_GEN_HASH_TOPIC);
    this.client.subscribeToResponseOf(AUTH_COMPARE_HASH_TOPIC);
    await this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }

  encodePassword(dto: PasswordDto): Observable<HashDto> {
    return this.client.send<HashDto>(AUTH_GEN_HASH_TOPIC, dto);
  }

  validatePassword(dto: ValidationDto): Observable<ValidationResultDto> {
    return this.client.send<ValidationResultDto>(AUTH_COMPARE_HASH_TOPIC, dto);
  }
}
