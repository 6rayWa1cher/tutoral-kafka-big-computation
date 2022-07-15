import {
  HashDto,
  PasswordDto,
  ValidationDto,
  ValidationResultDto,
} from '@app/shared';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@ApiTags('app')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('encode')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: HashDto,
  })
  encodePassword(@Body() dto: PasswordDto): Observable<HashDto> {
    return this.appService.encodePassword(dto);
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ValidationResultDto,
  })
  validatePassword(
    @Body() dto: ValidationDto,
  ): Observable<ValidationResultDto> {
    return this.appService.validatePassword(dto);
  }
}
