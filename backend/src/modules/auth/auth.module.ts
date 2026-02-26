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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@shared/guards/http/role.guard';
import { AuthWithHeader } from './guards/auth-header.guard';
import { PermissionsGuard } from '@shared/guards/http/permission.guard';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtAppService,
    OtpService,
    CacheService,
    {
      provide: APP_GUARD,
      useClass: AuthWithHeader,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [JwtService, JwtAppService],
})
export class AuthModule {}
