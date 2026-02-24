import { Body, Controller, Post } from '@nestjs/common';
import { RegisterByEmailDto } from '../dto/register-by-email.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register-by-email')
  async registerByEmail(@Body() dto: RegisterByEmailDto) {
    return this.service.registerByEmail(dto);
  }
}
