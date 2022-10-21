import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../users.service';

export const useCurrentUser = () => {
  const { data, error, isLoading } = useQuery(['currentUser'], async () => {
    const { data } = await fetchCurrentUser();
    return data;
  });

  return {
    user: data,
    error,
    isLoading,
  };
};
