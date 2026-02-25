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
import { VerifyByEmailDto } from '../dto/verify-by-email.dto';
import { Permission } from '../entities/permission.entity';
import { User } from '../entities/user.entity';
import { JwtAppService } from './jwt.service';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly cacheService: CacheService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtAppService,
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

  async verifyByEmail({ code, email }: VerifyByEmailDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['permissions'],
    });

    if (!user) throw new BadRequestException('invalid email');

    const otp = await this.cacheService.get(`email:${email}`);

    if (!otp) throw new BadRequestException('invalid otp');

    if (!Compare(code, otp)) throw new BadRequestException('invalid otp');

    await this.cacheService.del(`email:${email}`);

    const userPermissions = user.permissions?.map((p) => p.name) || [];

    return await this.jwtService.generateToken({
      role: user.role,
      sub: user.id,
      permissions: userPermissions,
    });
  }
}
