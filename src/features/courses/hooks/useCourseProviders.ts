import { useQuery } from '@tanstack/react-query';
import { CourseProvidersListResponse, fetchCourseProviders } from '../courses.service';

export const useCourseProviders = (page: string) => {
  const { data, error, isLoading } = useQuery<CourseProvidersListResponse>(
    ['course-providers', page],
    async () => {
      const { data } = await fetchCourseProviders({ page });
      return data;
    },
    { staleTime: 1000 * 60 * 60 },
  );

  return {
    courseProviders: data?.providers,
    pagination: data?.pagination,
    error,
    isLoading,
  };
};
