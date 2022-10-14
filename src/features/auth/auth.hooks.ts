import create from 'zustand';
import { AuthStore } from '@features/auth/auth.entity';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: !!localStorage.getItem('token'),
  setAuth: (bool: boolean) => set(() => ({ isAuth: bool })),
}));
