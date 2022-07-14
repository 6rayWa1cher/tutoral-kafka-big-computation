import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { KafkaContext } from '@nestjs/microservices';

@Catch(BadRequestException)
export class RpcBadRequestFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(RpcBadRequestFilter.name);

  async catch(exception: BadRequestException, host: ArgumentsHost) {
    if (host.getType() !== 'rpc') super.catch(exception, host);
    const rpc = host.switchToRpc();
    const ctx = rpc.getContext<KafkaContext>();
    this.logger.error(exception.message);
    await ctx.getConsumer().commitOffsets([
      {
        topic: ctx.getTopic(),
        partition: ctx.getPartition(),
        offset: (+ctx.getMessage().offset + 1).toString(),
      },
    ]);
  }
}
