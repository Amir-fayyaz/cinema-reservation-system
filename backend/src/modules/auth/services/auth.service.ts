import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from '@shared/services/cache.service';
import { Compare, Hash } from '@shared/utils/hash';
import { Repository } from 'typeorm';
import { RegisterByEmailDto } from '../dto/register-by-email.dto';
import { User } from '../entities/user.entity';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cacheService: CacheService,
    private readonly otpService: OtpService,
  ) {}

  async registerByEmail({ email, password }: RegisterByEmailDto) {
    const isOtpSentBefore = await this.cacheService.get(`email:${email}`);

    if (isOtpSentBefore)
      throw new HttpException(
        'otp already sent to your email',
        HttpStatus.TOO_MANY_REQUESTS,
      );

    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      if (!(await Compare(password, user.password)))
        throw new BadRequestException('wrong password');

      return await this.otpService.sendOtpToEmail(email);
    }

    const newUser = this.userRepository.create({
      email,
      password: await Hash(password),
    });

    await this.userRepository.save(newUser);

    return await this.otpService.sendOtpToEmail(email);
  }
}
