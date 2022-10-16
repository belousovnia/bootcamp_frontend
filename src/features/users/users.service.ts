import { requestService } from '@infrastructure/request';
import { AxiosResponse } from 'axios';
import { UserInfoFull } from './users.entity';

export type GetUserInfoResponse = UserInfoFull;

export const fetchCurrentUser = async (): Promise<AxiosResponse<GetUserInfoResponse>> => {
  return requestService.get(`user/me`);
};
