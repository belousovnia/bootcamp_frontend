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
export type ProvidersListResponse = {
  providers: ProviderShort[];
  pagination: {
    page: number;
    totalPages: number;
  };
};
export const fetchProviders = (
  args: ProvidersListArgs,
): Promise<AxiosResponse<ProvidersListResponse>> => {
  return requestService.get(`providers`, { params: args.options });
};
export type ProviderCreateArgs = Omit<ProviderFull, 'id'>;
export type ProviderCreateResponse = {
  type: 'success' | 'error';
  message: string;
};
export const createProvider = (
  args: ProviderCreateArgs,
): Promise<AxiosResponse<ProviderResponse>> => {
  return requestService.post(`providers`, args);
};
export type ProviderListArgs = {
  id: string;
};
export type ProviderResponse = {
  provider: ProviderFull;
};
export const fetchProvider = (
  args: ProviderListArgs,
): Promise<AxiosResponse<ProviderResponse>> => {
  return requestService.get(`providers/${args.id}`);
};
export type ProviderUpdateArgs = Omit<ProviderFull, 'id'>;
export type ProviderUpdateResponse = {
  type: 'success' | 'error';
  message: string;
};
export const updateProvider = (
  args: CourseDetailsArgs,
): Promise<AxiosResponse<ProviderUpdateResponse>> => {
  return requestService.post(`providers/${args.id}`, args);
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
