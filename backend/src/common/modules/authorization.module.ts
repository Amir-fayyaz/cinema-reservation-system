import { AuthWithHeader } from '@core/auth/guards/auth-header.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from '@shared/guards/http/permission.guard';
import { RolesGuard } from '@shared/guards/http/role.guard';

@Module({
  providers: [
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
  exports: [],
})
export class AuthorizationModule {}
