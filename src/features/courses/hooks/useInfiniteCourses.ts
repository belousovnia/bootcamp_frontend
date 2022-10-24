import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { FilterOptions } from '../components/CoursesFilter';
import { CoursesListResponse, fetchCourses } from '../courses.service';

export const useInfiniteCourses = (
  page: number,
  opts: FilterOptions,
  queryOpts?: Omit<
    UseInfiniteQueryOptions<any, Error, CoursesListResponse, any, any>,
    'queryKey' | 'queryFn'
  >,
) => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<CoursesListResponse, Error>(
    ['courses', page, opts],
    async ({ pageParam = 1 }) => {
      const { data } = await fetchCourses({ page: pageParam, ...opts });
      return data;
    },
    {
      ...queryOpts,
      getNextPageParam: (data) =>
        data.content.length === 0 || data.pageNumber >= data.totalPages
          ? undefined
          : data.pageNumber + 1,
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
