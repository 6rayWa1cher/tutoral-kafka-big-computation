import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: config.getOrThrow<KafkaOptions>('kafka'),
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
