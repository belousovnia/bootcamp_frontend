import { requestService } from '@infrastructure/request';
import { AxiosResponse } from 'axios';
import { UserInfoFull, UserProfileFull } from './users.entity';

export type GetUserInfoResponse = UserInfoFull;

export const fetchCurrentUser = async (): Promise<AxiosResponse<GetUserInfoResponse>> => {
  return requestService.get(`v1/users/me`);
};

export type GetCurrentUserProfileResponse = UserProfileFull;

export const fetchCurrentUserProfile = async (): Promise<
  AxiosResponse<GetCurrentUserProfileResponse>
> => {
  return requestService.get(`v1/profiles/my`);
};
