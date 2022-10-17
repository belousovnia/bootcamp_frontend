import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { FilterOptions } from '../components/CoursesFilter';
import { fetchCourses } from '../courses.service';

export const useInfiniteCourses = (page: number, opts: FilterOptions) => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['courses', page, opts],
    async ({ pageParam = 1 }) => {
      const { data } = await fetchCourses({ page: pageParam, ...opts });
      return data;
    },
    {
      getNextPageParam: (data) =>
        data.pagination.totalPages > 1 ? data.pagination.page + 1 : undefined,
    },
  );

  return {
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
