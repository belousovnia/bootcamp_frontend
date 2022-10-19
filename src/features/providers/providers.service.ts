import { AxiosResponse } from 'axios';
import { requestService } from '@infrastructure/request';
import { CourseDetailsArgs } from '@features/courses/courses.service';
import { ProviderFull, ProviderShort } from '@features/providers/providers.entity';

export type ProvidersListArgs = {
  page: string;
  options?: {
    search?: string;
  };
};
export type ProvidersAllResponse = ProviderFull[];
export const fetchAllProviders = (): Promise<AxiosResponse<ProvidersAllResponse>> => {
  return requestService.get(`v1/providers/all`);
};
export type ProviderCreateArgs = Omit<ProviderFull, 'id'>;
export type ProviderCreateResponse = {
  type: 'success' | 'error';
  message: string;
};
export const createProvider = (
  args: ProviderCreateArgs,
): Promise<AxiosResponse<ProviderResponse>> => {
  return requestService.post(`v1/providers`, args);
};
export type ProviderListArgs = {
  id: string;
};

export type ProviderResponse = ProviderFull;

export const fetchProvider = (
  args: ProviderListArgs,
): Promise<AxiosResponse<ProviderResponse>> => {
  return requestService.get(`v1/providers/${args.id}`);
};
export type ProviderUpdateArgs = ProviderFull;
export type ProviderUpdateResponse = {
  type: 'success' | 'error';
  message: string;
};
export const updateProvider = (
  args: ProviderUpdateArgs,
): Promise<AxiosResponse<ProviderUpdateResponse>> => {
  return requestService.put(`v1/providers/${args.id}`, args);
};
export type ProviderDeleteResponse = {
  type: 'success' | 'error';
  message: string;
};
export const deleteCourseProvider = (
  args: CourseDetailsArgs,
): Promise<AxiosResponse<ProviderDeleteResponse>> => {
  return requestService.delete(`providers/${args.id}`);
};
