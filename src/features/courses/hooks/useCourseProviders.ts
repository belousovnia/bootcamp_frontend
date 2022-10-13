import { useQuery } from '@tanstack/react-query';
import { CourseProvidersListResponse, fetchCourseProviders } from '../courses.service';

export const useCourseProviders = (page: string) => {
  const { data, error, isLoading } = useQuery<CourseProvidersListResponse>(
    ['course-providers', page],
    () => fetchCourseProviders({ page }),
  );

  return {
    courseProviders: data?.providers,
    pagination: data?.pagination,
    error,
    isLoading,
  };
};
