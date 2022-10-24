import { CurrentUserRoles } from '@features/auth';

export type UserInfoFull = {
  id: number;
  email: string;
  name?: string;
  role: CurrentUserRoles;
};

export type UserProfileFull = {
  id: number;
  email: string;
  role: CurrentUserRoles;
  name?: string;
  surname?: string;
  isConfirmed: boolean;
  registreredAt: string;
  confirmedAt?: string;
  userId: number;
  professionId?: number;
};
