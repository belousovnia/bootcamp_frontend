import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  fetchAllProviders,
  ProvidersAllResponse,
} from '@features/providers/providers.service';

export const useAllProviders = () => {
  const queryOptions = {
    staleTime: 1000 * 60 * 60,
  };

  const { data, error, isLoading } = useQuery<ProvidersAllResponse, Error>(
    ['providers'],
    async () => {
      const { data } = await fetchAllProviders();
      return data;
    },
    queryOptions,
  );

  return {
    courseProviders: data,
    error,
    isLoading,
  };
};
