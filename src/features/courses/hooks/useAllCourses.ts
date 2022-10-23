import { useQuery } from '@tanstack/react-query';
import { CoursesAllResponse, fetchAllCourses } from '../courses.service';

export const useAllCourses = () => {
  const { data, error, isLoading, isFetching, isRefetching } = useQuery<
    CoursesAllResponse,
    Error
  >(
    ['courses'],
    async () => {
      const { data } = await fetchAllCourses();
      return data;
    },
    { keepPreviousData: true },
  );

  return {
    courses: data,
    error,
    isLoading,
    isFetching,
    isRefetching,
  };
};
