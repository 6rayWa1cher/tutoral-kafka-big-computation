import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModule,
  ClientsModuleOptionsFactory,
  KafkaOptions,
  Transport,
} from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';

@Injectable()
class RpcConfigService implements ClientsModuleOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createClientOptions(): ClientProvider | Promise<ClientProvider> {
    return {
      transport: Transport.KAFKA,
      options: this.config.getOrThrow<KafkaOptions['options']>('kafka'),
    };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useClass: RpcConfigService,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
