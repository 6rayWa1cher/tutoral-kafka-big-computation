import { NestFactory, Reflector } from '@nestjs/core';
import { ComputationalAppModule } from './computational-app.module';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ComputationalAppModule);
  const config = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: config.getOrThrow<KafkaOptions>('kafka'),
  });
  await app.startAllMicroservices();
}
bootstrap();
