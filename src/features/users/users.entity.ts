// @TODO: move to auth feature
export type UserAuth = {
  id: string;
  email: string;
};

export type UserRole = {
  id: string;
  name: string;
};

export type UserInfoShort = {
  id: number;
  roles: UserRole[];
  auth: UserAuth;
  registeredAtDateMsk: string;
  archivedAtDateMsk: string;
  isConfirmed: boolean;
};

export type UserInfoFull = {
  id: number;
  name?: string;
  surname?: string;
  patronymic?: string;
  roles: UserRole[];
  auth: UserAuth;
  isConfirmed: boolean;
  registeredAtDateMsk: string;
  profession?: {
    id: number;
    name: string;
  };
};
