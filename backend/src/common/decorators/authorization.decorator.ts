import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY, ROLES_KEY } from '@shared/constants/authorizaton';
import { ApplicationRoles } from '@shared/enums/role-app.enum';

export const AuthorizeByPermission = (...permissions: string[]) => {
  return SetMetadata(PERMISSIONS_KEY, permissions);
};

export const AuthorizeByRole = (...roles: ApplicationRoles[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
