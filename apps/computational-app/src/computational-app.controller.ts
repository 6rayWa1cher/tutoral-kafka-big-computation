import {
  Controller,
  UseFilters,
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

@Controller()
@UsePipes(ValidationPipe)
@UseFilters(RpcBadRequestFilter)
export class ComputationalAppController {
  constructor(
    private readonly computationalAppService: ComputationalAppService,
  ) {}

  @MessagePattern('auth.gen-hash')
  async generateHash(@Payload() dto: PasswordDto): Promise<HashDto> {
    const hash = await this.computationalAppService.hashPassword(dto.password);
    return new HashDto({ hash });
  }

  @MessagePattern('auth.compare-hash')
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
