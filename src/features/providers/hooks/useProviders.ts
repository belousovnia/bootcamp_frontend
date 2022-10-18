import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  fetchProviders,
  ProvidersListResponse,
} from '@features/providers/providers.service';

type SelectOptions = {
  search?: string;
  page: string;
};

export const useProviders = (
  selectOptions: SelectOptions,
  queryOpts?: UseQueryOptions<
    ProvidersListResponse,
    unknown,
    ProvidersListResponse,
    QueryKey
  >,
) => {
  const mergedQueryOpts = {
    ...queryOpts,
    staleTime: 1000 * 60 * 60,
  };

  const { data, error, isLoading } = useQuery<ProvidersListResponse>(
    ['providers', selectOptions.page],
    async () => {
      const { data } = await fetchProviders({
        page: selectOptions.page,
        options: selectOptions,
      });
      return data;
    },
    mergedQueryOpts,
  );

  return {
    courseProviders: data,
    pagination: null,
    error,
    isLoading,
  };
};
