import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEvents } from '@shared/constants/events/auth.events';
import { AuthMessages } from '@shared/messages/auth/auth-message';
import { CacheService } from '@shared/services/cache.service';
import { Compare, Hash } from '@shared/utils/hash';
import { Repository } from 'typeorm';
import { RegisterByEmailDto } from '../dto/register-by-email.dto';
import { VerifyByEmailDto } from '../dto/verify-by-email.dto';
import { User } from '../entities/user.entity';
import { LoginResponse } from '../types/login-response.type';
import { JwtAppService } from './jwt.service';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cacheService: CacheService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtAppService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async registerByEmail({ email, password }: RegisterByEmailDto) {
    const isOtpSentBefore = await this.cacheService.get(`email:${email}`);

    if (isOtpSentBefore) {
      this.eventEmitter.emit(AuthEvents.REGISTER_BY_EMAIL, {
        aggregateId: '',
        email,
        message: AuthMessages.OTP_SENT_BEFORE,
      });
      throw new HttpException(
        'otp already sent to your email',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      if (!(await Compare(password, user.password))) {
        this.eventEmitter.emit(AuthEvents.REGISTER_BY_EMAIL, {
          aggregateId: user.id,
          email,
          message: AuthMessages.WRONG_PASSWORD,
        });
        throw new BadRequestException('wrong password');
      }

      this.eventEmitter.emit(AuthEvents.REGISTER_BY_EMAIL, {
        aggregateId: user.id,
        email,
        message: AuthMessages.OTP_SENT,
      });

      return await this.otpService.sendOtpToEmail(email);
    }

    const newUser = this.userRepository.create({
      email,
      password: await Hash(password),
    });

    await this.userRepository.save(newUser);

    this.eventEmitter.emit(AuthEvents.REGISTER_BY_EMAIL, {
      aggregateId: newUser.id,
      email,
      message: AuthMessages.OTP_SENT,
    });

    return await this.otpService.sendOtpToEmail(email);
  }

  async verifyByEmail({
    code,
    email,
  }: VerifyByEmailDto): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['permissions'],
    });

    if (!user) {
      this.eventEmitter.emit(AuthEvents.LOGIN_BY_EMAIL, {
        aggregateId: '',
        email,
        message: AuthMessages.USER_WITH_THIS_EMAIL_NOT_FOUND,
      });
      throw new BadRequestException('invalid email');
    }

    const otp = await this.cacheService.get(`email:${email}`);

    if (!otp) {
      this.eventEmitter.emit(AuthEvents.LOGIN_BY_EMAIL, {
        aggregateId: user.id,
        email,
        message: AuthMessages.WRONG_OTP,
        otpCode: code,
      });
      throw new BadRequestException('invalid otp');
    }

    if (!(await Compare(code, otp))) {
      this.eventEmitter.emit(AuthEvents.LOGIN_BY_EMAIL, {
        aggregateId: user.id,
        email,
        message: AuthMessages.WRONG_OTP,
        otpCode: code,
      });
      throw new BadRequestException('invalid otp');
    }

    await this.cacheService.del(`email:${email}`);

    const userPermissions = user.permissions?.map((p) => p.name) || [];

    this.eventEmitter.emit(AuthEvents.LOGIN_BY_EMAIL, {
      aggregateId: user.id,
      email,
      message: AuthMessages.LOGIN_WITH_EMAIL_WAS_SUCCESSFULLY,
      otpCode: code,
      data: {
        withRole: user.role,
        withPermissions: userPermissions,
      },
    });
    return await this.jwtService.generateToken({
      role: user.role,
      sub: user.id,
      permissions: userPermissions,
    });
  }
}
