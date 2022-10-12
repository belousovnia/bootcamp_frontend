import { CourseShort } from './cources.entity';
import wretch from 'wretch';

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

export const fetchCourses = (args: CoursesListArgs): Promise<CoursesListResponse> => {
  const params = new URLSearchParams(args);
  console.log(params.toString());

  return wretch(`/api/courses?${params.toString()}`).get().json();
};
