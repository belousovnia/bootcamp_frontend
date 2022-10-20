import create from 'zustand';
import { AuthStore } from '@features/auth/auth.entity';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@features/auth/auth.service';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: !!localStorage.getItem('accessToken'),
  setAuth: (bool: boolean) => set(() => ({ isAuth: bool })),
}));

export const useCurrentUser = () => {
  return useQuery(['currentUser'], async () => {
    const { data } = await getUserInfo();
    return data;
  });
};
