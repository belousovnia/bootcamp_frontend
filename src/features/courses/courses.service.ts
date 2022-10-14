import wretch from 'wretch';
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
    totalPages: number;
  };
};

export const fetchCourses = (args: CoursesListArgs): Promise<CoursesListResponse> => {
  const params = new URLSearchParams(args);

  return wretch(`/api/courses?${params.toString()}`).get().json();
};

export type CourseDetailsResponse = {
  course: CourseFull;
};

export type CourseDetailsArgs = {
  id: string;
};

export const fetchCourse = (args: CourseDetailsArgs): Promise<CourseDetailsResponse> => {
  return wretch(`/api/courses/${args.id}`).get().json();
};

export type CourseDeleteResponse = {
  type: 'success' | 'error';
  message: string;
};

export type CourseDeleteArgs = {
  id: string;
};

export const deleteCourse = (args: CourseDeleteArgs): Promise<CourseDeleteResponse> => {
  return wretch(`/api/courses/${args.id}`).delete().json();
};

export type CourseUpdateArgs = { id: string; changes: Partial<CourseFull> };
export type CourseUpdateResponse = {
  type: 'success' | 'error';
  message: string;
};

export const updateCourse = (args: CourseUpdateArgs): Promise<CourseProviderResponse> => {
  return wretch(`/api/courses/${args.id}`).post(args.changes).json();
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
): Promise<CourseProvidersListResponse> => {
  const params = new URLSearchParams(args);
  return wretch(`/api/course-providers/?${params.toString()}`).get().json();
};

export type CourseProviderCreateArgs = Omit<CourseProviderFull, 'id'>;

export type CourseProviderCreateResponse = {
  type: 'success' | 'error';
  message: string;
};

export const createCourseProvider = (
  args: CourseProviderCreateArgs,
): Promise<CourseProviderResponse> => {
  return wretch(`/api/course-providers/new`).post(args).json();
};

export type CourseProviderListArgs = {
  id: string;
};

export type CourseProviderResponse = {
  provider: CourseProviderFull;
};

export const fetchCourseProvider = (
  args: CourseProviderListArgs,
): Promise<CourseProviderResponse> => {
  return wretch(`/api/course-providers/${args.id}`).get().json();
};

export type CourseProviderUpdateArgs = Omit<CourseProviderFull, 'id'>;
export type CourseProviderUpdateResponse = {
  type: 'success' | 'error';
  message: string;
};

export const updateCourseProvider = (
  args: CourseDetailsArgs,
): Promise<CourseProviderResponse> => {
  return wretch(`/api/course-providers/${args.id}`).post(args).json();
};

export type CourseProviderDeleteArgs = Omit<CourseProviderFull, 'id'>;
export type CourseProviderDeleteResponse = {
  type: 'success' | 'error';
  message: string;
};

export const deleteCourseProvider = (
  args: CourseDetailsArgs,
): Promise<CourseProviderResponse> => {
  return wretch(`/api/course-providers/${args.id}`).delete().json();
};
