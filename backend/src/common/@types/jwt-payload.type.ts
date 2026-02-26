import { ApplicationRoles } from '@shared/enums/role-app.enum';

export type JwtPayload = {
  sub: string;
  role: ApplicationRoles;
  permissions: string[];
};
