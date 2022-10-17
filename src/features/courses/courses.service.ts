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

export type CoursesListResponse = {
  courses: CourseShort[];
  pagination: {
    page: number;
    totalPages: number;
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

export type CourseUpdateArgs = { id: string; changes: Partial<CourseFull> };
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
  providerId: string;
  professionId: string;
  tags: string[];
};

export type CourseCreateResponse = {
  type: 'success' | 'error';
  message: string;
};

export const createCourse = (args: CourseCreateArgs): Promise<CourseCreateResponse> => {
  return requestService.post(`courses/new`, args);
};
