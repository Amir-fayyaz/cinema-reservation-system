import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from '@shared/services/cache.service';
import { AuthController } from './controllers/auth.controller';
import { Permission } from './entities/permission.entity';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtAppService } from './services/jwt.service';
import { OtpService } from './services/otp.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtAppService, OtpService, CacheService],
  exports: [JwtService, JwtAppService],
})
export class AuthModule {}
