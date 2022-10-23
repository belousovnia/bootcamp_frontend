import { CurrentUserRoles } from '@features/auth';

export type UserInfoFull = {
  id: number;
  email: string;
  name?: string;
  role: CurrentUserRoles;
};
