import axios, { AxiosRequestConfig } from 'axios';
import { AuthResponse } from '@features/auth/auth.entity';
import { logOut } from '@features/auth/components';

const serverURL = import.meta.env.VITE_API_URL;

export const requestService = axios.create({
  withCredentials: true,
  baseURL: `${serverURL}/api`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

const getAccessToken = () => localStorage.getItem('accessToken') || '';
const getRefreshToken = () => localStorage.getItem('refreshToken') || '';

requestService.interceptors.request.use((config: AxiosRequestConfig) => {
  if (getAccessToken()) {
    (config.headers ?? {}).Authorization = `Bearer ${getAccessToken()}`;
  }
  return config;
});

requestService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status == 401 &&
      error.config &&
      !originalRequest._retry &&
      !!getRefreshToken()
    ) {
      originalRequest._retry = true;
      try {
        const response = await axios.post<AuthResponse>(
          `${serverURL}/api/v1/auth/refresh`,
          {
            refreshToken: getRefreshToken(),
          },
        );
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        await requestService.request(originalRequest);
      } catch (e) {
        await Promise.reject(e).finally(() => logOut());
      }
    } else {
      await Promise.reject(error);
    }
  },
);
