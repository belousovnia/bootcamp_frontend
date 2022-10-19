import { useQuery } from '@tanstack/react-query';
import { fetchProvider, ProviderResponse } from '@features/providers/providers.service';

export const useProvider = (id: string) => {
  const { data, error, isLoading } = useQuery<ProviderResponse, Error>(
    ['provider', id],
    async () => {
      const { data } = await fetchProvider({ id });
      return data;
    },
    { refetchOnWindowFocus: false, staleTime: Infinity },
  );

  return {
    provider: data,
    error,
    isLoading,
  };
};
