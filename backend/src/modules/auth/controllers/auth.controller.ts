import { Body, Controller, Post } from '@nestjs/common';
import { SkipAuth } from '@shared/decorators/skip-auth.decorator';
import { RegisterByEmailDto } from '../dto/register-by-email.dto';
import { VerifyByEmailDto } from '../dto/verify-by-email.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@SkipAuth()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register-by-email')
  async registerByEmail(@Body() dto: RegisterByEmailDto) {
    return this.service.registerByEmail(dto);
  }

  @Post('verify-by-email')
  async verifyByEmail(@Body() dto: VerifyByEmailDto) {
    return this.service.verifyByEmail(dto);
  }
}
