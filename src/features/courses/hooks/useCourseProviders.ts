import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CourseProvidersListResponse, fetchCourseProviders } from '../courses.service';

type SelectOptions = {
  search?: string;
  page: string;
};

export const useCourseProviders = (
  selectOptions: SelectOptions,
  queryOpts?: UseQueryOptions<
    CourseProvidersListResponse,
    unknown,
    CourseProvidersListResponse,
    QueryKey
  >,
) => {
  const mergedQueryOpts = {
    ...queryOpts,
    staleTime: 1000 * 60 * 60,
  };

  const { data, error, isLoading } = useQuery<CourseProvidersListResponse>(
    ['course-providers', selectOptions.page],
    async () => {
      const { data } = await fetchCourseProviders({
        page: selectOptions.page,
        options: selectOptions,
      });
      return data;
    },
    mergedQueryOpts,
  );

  return {
    courseProviders: data?.providers,
    pagination: data?.pagination,
    error,
    isLoading,
  };
};
