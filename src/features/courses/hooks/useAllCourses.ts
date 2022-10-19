import { useQuery } from '@tanstack/react-query';
import { FilterOptions } from '../components/CoursesFilter';
import { fetchAllCourses, fetchCourses } from '../courses.service';

export const useAllCourses = () => {
  const { data, error, isLoading, isFetching, isRefetching } = useQuery(
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
