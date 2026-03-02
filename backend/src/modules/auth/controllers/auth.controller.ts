import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  accessTokenExpireTimeByMilliSecond,
  accessTokenName,
  refreshTokenExpireTimeByMilliSecond,
  refreshTokenName,
} from '@shared/constants';
import { Cookie, SkipAuth } from '@shared/decorators';
import { setCookies } from '@shared/utils';
import { Response } from 'express';
import { RegisterByEmailDto, VerifyByEmailDto } from '../dto';
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
          maxAge: accessTokenExpireTimeByMilliSecond,
        },
      },
    ]);

    response.json({ success: true });
  }

  @Post('refresh-token')
  async refreshToken(
    @Cookie(refreshTokenName) token: string,
    @Res() response: Response,
  ) {
    const accessToken = await this.service.refreshToken(token);

    setCookies(response, [
      {
        name: accessTokenName,
        value: accessToken,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: accessTokenExpireTimeByMilliSecond,
        },
      },
    ]);

    response.json({ success: true });
  }
}
