import {
  ClassSerializerInterceptor,
  Controller,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ComputationalAppService } from './computational-app.service';
import {
  HashDto,
  PasswordDto,
  ValidationDto,
  ValidationResultDto,
} from '@app/shared/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcBadRequestFilter } from './filter';
import { AUTH_COMPARE_HASH_TOPIC, AUTH_GEN_HASH_TOPIC } from '@app/shared';

@Controller()
@UsePipes(
  new ValidationPipe({
    whitelist: true,
  }),
)
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(RpcBadRequestFilter)
export class ComputationalAppController {
  constructor(
    private readonly computationalAppService: ComputationalAppService,
  ) {}

  @MessagePattern(AUTH_GEN_HASH_TOPIC)
  async generateHash(@Payload() dto: PasswordDto): Promise<HashDto> {
    const hash = await this.computationalAppService.hashPassword(dto.password);
    return new HashDto({ hash });
  }

  @MessagePattern(AUTH_COMPARE_HASH_TOPIC)
  async compareHash(
    @Payload() dto: ValidationDto,
  ): Promise<ValidationResultDto> {
    const result = await this.computationalAppService.validatePassword(
      dto.password,
      dto.hash,
    );
    return new ValidationResultDto({ valid: result });
  }
}
