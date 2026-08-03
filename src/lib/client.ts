import { refreshTokens } from '@/api/refresh';
import { useAuthStore } from '@/store/auth-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type ApiClientOptions = RequestInit & {
  auth?: boolean;
};

let refreshPromise: Promise<boolean> | null = null;

const refreshAccessToken = async (): Promise<boolean> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const { refreshToken, setTokens, signOut } = useAuthStore.getState();

      if (!refreshToken) {
        signOut();
        return false;
      }

      const result = await refreshTokens(refreshToken);
      if (result.success && result.data) {
        setTokens(result.data.accessToken, result.data.refreshToken);
        return true;
      }

      signOut();
      return false;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

export const apiClient = async <T>(
  path: string,
  options: ApiClientOptions = {},
): Promise<T> => {
  const { auth = true } = options;

  const request = async (): Promise<Response> => {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (auth) {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
    }

    return fetch(`${API_URL}${path}`, { ...options, headers });
  };

  const response = await request();

  if (response.status === 401 && auth) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const retryResponse = await request();
      return retryResponse.json() as T;
    }
    throw new Error('Session expired, please log in again');
  }

  return response.json() as T;
};
