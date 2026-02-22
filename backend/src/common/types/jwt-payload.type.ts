import { AppPermissions } from '@shared/enums/permission.enum';
import { ApplicationRoles } from '@shared/enums/role-app.enum';

export type JwtPayload = {
  sub: string;
  role: ApplicationRoles;
  permissions: AppPermissions[];
};
