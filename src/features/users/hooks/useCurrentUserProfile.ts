import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUserProfile } from '../users.service';

export const useCurrentUserProfile = () => {
  const { data, error, isLoading } = useQuery(['currentUserProfile'], async () => {
    const { data } = await fetchCurrentUserProfile();
    return data;
  });

  return {
    profile: data,
    error,
    isLoading,
  };
};
