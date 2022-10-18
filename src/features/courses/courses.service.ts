import { requestService } from '@infrastructure/request';
import { AxiosResponse } from 'axios';
import { CourseFull, CourseShort } from './cources.entity';

export type CoursesSortBy = 'date-start' | 'date-end';

export type CoursesListArgs = {
  page: string;
  search?: string;
  sortBy?: CoursesSortBy;
  directionId?: string;
};

export type CoursesListResponse = CourseFull[];

export const fetchCourses = (
  args: CoursesListArgs,
): Promise<AxiosResponse<CoursesListResponse>> => {
  return requestService.get(`v1/courses`, { params: args });
};

export type CourseDetailsResponse = CourseFull;

export type CourseDetailsArgs = {
  id: string;
};

export const fetchCourse = (
  args: CourseDetailsArgs,
): Promise<AxiosResponse<CourseDetailsResponse>> => {
  return requestService.get(`v1/courses/${args.id}`);
};

export type CourseDeleteResponse = {
  type: 'success' | 'error';
  message: string;
};

export type CourseDeleteArgs = {
  id: string;
};

export const deleteCourse = (
  args: CourseDeleteArgs,
): Promise<AxiosResponse<CourseDeleteResponse>> => {
  return requestService.delete(`/api/courses/${args.id}`);
};

export type CourseUpdateArgs = CourseCreateArgs & { id: number };
export type CourseUpdateResponse = {
  type: 'success' | 'error';
  message: string;
};

export const updateCourse = (args: CourseUpdateArgs): Promise<CourseUpdateResponse> => {
  return requestService.post(`courses/${args.id}`, args);
};

export type CourseCreateArgs = {
  title: string;
  url: string;
  coverUrl: string;
  description: string;
  startsAt: string;
  endsAt: string;
  isAdvanced: boolean;
  courseId: string;
  providerId: number;
  professionId: string;
  tags: string[];
};

export type CourseCreateResponse = {
  type: 'success' | 'error';
  message: string;
};

export const createCourse = (args: CourseCreateArgs): Promise<CourseCreateResponse> => {
  return requestService.post(`v1/courses`, args);
};
