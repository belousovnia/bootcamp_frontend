import create from 'zustand';
import { AuthStore } from '@features/auth/auth.entity';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: !!localStorage.getItem('accessToken'),
  setAuth: (bool: boolean) => set(() => ({ isAuth: bool })),
}));
