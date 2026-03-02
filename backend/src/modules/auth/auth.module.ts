import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEventListener } from '@shared/event-listeners/auth/auth.eventListener';
import { CacheService } from '@shared/services/cache.service';
import { AuthController } from './controllers/auth.controller';
import { PermissionCategoryController } from './controllers/permission-category.controller';
import { PermissionController } from './controllers/permission.controller';
import { UserController } from './controllers/user.controller';
import { PermissionCategory } from './entities/permission-category.entity';
import { Permission } from './entities/permission.entity';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtAppService } from './services/jwt.service';
import { OtpService } from './services/otp.service';
import { PermissionCategoryService } from './services/permission-category.service';
import { PermissionService } from './services/permission.service';
import { UserService } from './services/user.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Permission, PermissionCategory])],
  controllers: [
    AuthController,
    PermissionCategoryController,
    PermissionController,
    UserController,
  ],
  providers: [
    AuthService,
    JwtService,
    JwtAppService,
    AuthEventListener,
    OtpService,
    CacheService,
    PermissionCategoryService,
    PermissionService,
    UserService,
  ],
  exports: [JwtService, JwtAppService],
})
export class AuthModule {}
