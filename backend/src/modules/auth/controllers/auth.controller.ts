import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  accessTokenName,
  refreshTokenExpireTimeByMilliSecond,
  refreshTokenName,
} from '@shared/constants/jwt';
import { SkipAuth } from '@shared/decorators/skip-auth.decorator';
import { setCookies } from '@shared/utils/set-cookie';
import { Response } from 'express';
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
  async verifyByEmail(
    @Body() dto: VerifyByEmailDto,
    @Res() response: Response,
  ) {
    const tokens = await this.service.verifyByEmail(dto);

    setCookies(response, [
      {
        name: refreshTokenName,
        value: tokens.refreshToken,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: refreshTokenExpireTimeByMilliSecond,
        },
      },
      {
        name: accessTokenName,
        value: tokens.accessToken,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: refreshTokenExpireTimeByMilliSecond,
        },
      },
    ]);

    response.json({ success: true });
  }
}
