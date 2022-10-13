import { useQuery } from '@tanstack/react-query';
import { CourseProviderResponse, fetchCourseProvider } from '../courses.service';

export const useCourseProvider = (id: string) => {
  const { data, error, isLoading } = useQuery<CourseProviderResponse>(
    ['course-provider', id],
    () => fetchCourseProvider({ id }),
    { refetchOnWindowFocus: false, staleTime: Infinity },
  );

  return {
    provider: data?.provider,
    error,
    isLoading,
  };
};
