export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthStore {
  isAuth: boolean;
  setAuth: (bool: boolean) => void;
}

export interface RegistrationUser {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;
}
