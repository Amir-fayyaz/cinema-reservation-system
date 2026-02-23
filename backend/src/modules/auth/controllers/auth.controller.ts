import { Body, Controller, Post } from '@nestjs/common';
import { HashPasswordPipe } from '@shared/pipes/hash-password.pipe';
import { RegisterByEmailDto } from '../dto/register-by-email.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register-by-email')
  async registerByEmail(@Body(HashPasswordPipe) dto: RegisterByEmailDto) {
    return this.service.registerByEmail(dto);
  }
}
