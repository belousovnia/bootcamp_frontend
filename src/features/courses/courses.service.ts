import { requestService } from '@infrastructure/request';
import { AxiosResponse } from 'axios';
import {
  CourseFull,
  CourseProviderFull,
  CourseProviderShort,
  CourseShort,
} from './cources.entity';

export type CoursesSortBy = 'date-start' | 'date-end';

export type CoursesListArgs = {
  page: string;
  search?: string;
  sortBy?: CoursesSortBy;
  directionId?: string;
};

export type CoursesListResponse = {
  courses: CourseShort[];
  pagination: {
    page: number;
    total: number;
  };
};

export const fetchCourses = (
  args: CoursesListArgs,
): Promise<AxiosResponse<CoursesListResponse>> => {
  return requestService.get(`courses`, { params: args });
};

export type CourseDetailsResponse = {
  course: CourseFull;
};

export type CourseDetailsArgs = {
  id: string;
};

export const fetchCourse = (
  args: CourseDetailsArgs,
): Promise<AxiosResponse<CourseDetailsResponse>> => {
  return requestService.get(`courses/${args.id}`);
};

export type CourseProvidersListArgs = {
  page: string;
};

export type CourseProvidersListResponse = {
  providers: CourseProviderShort[];
  pagination: {
    page: number;
    totalPages: number;
  };
};

export const fetchCourseProviders = (
  args: CourseProvidersListArgs,
): Promise<AxiosResponse<CourseProvidersListResponse>> => {
  return requestService.get(`course-providers`, { params: args });
};

export type CourseProviderCreateArgs = Omit<CourseProviderFull, 'id'>;

export type CourseProviderCreateResponse = {
  type: 'success' | 'error';
  message: string;
};

export const createCourseProvider = (
  args: CourseProviderCreateArgs,
): Promise<AxiosResponse<CourseProviderResponse>> => {
  return requestService.post(`course-providers`, args);
};

export type CourseProviderListArgs = {
  id: string;
};

export type CourseProviderResponse = {
  provider: CourseProviderFull;
};

export const fetchCourseProvider = (
  args: CourseProviderListArgs,
): Promise<AxiosResponse<CourseProviderResponse>> => {
  return requestService.get(`course-providers/${args.id}`);
};

export type CourseProviderUpdateArgs = Omit<CourseProviderFull, 'id'>;
export type CourseProviderUpdateResponse = {
  type: 'success' | 'error';
  message: string;
};

export const updateCourseProvider = (
  args: CourseDetailsArgs,
): Promise<AxiosResponse<CourseProviderUpdateResponse>> => {
  return requestService.post(`course-providers/${args.id}`, args);
};

export type CourseProviderDeleteArgs = Omit<CourseProviderFull, 'id'>;
export type CourseProviderDeleteResponse = {
  type: 'success' | 'error';
  message: string;
};

export const deleteCourseProvider = (
  args: CourseDetailsArgs,
): Promise<AxiosResponse<CourseProviderDeleteResponse>> => {
  return requestService.delete(`course-providers/${args.id}`);
};
