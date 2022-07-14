import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ComputationalAppController } from './computational-app.controller';
import { ComputationalAppService } from './computational-app.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [ComputationalAppController],
  providers: [ComputationalAppService],
})
export class ComputationalAppModule {}
