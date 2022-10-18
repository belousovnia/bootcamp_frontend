import { AxiosResponse } from 'axios';
import { requestService } from '@infrastructure/request';
import { AuthResponse, RegistrationUser } from '@features/auth/auth.entity';

export const login = async (
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponse>> => {
  return await requestService.post('/v1/auth/login', { email, password });
};

export const registration = async (
  user: RegistrationUser,
): Promise<AxiosResponse<AuthResponse>> => {
  return await requestService.post('/v1/auth/signup', {
    ...user,
  });
};
