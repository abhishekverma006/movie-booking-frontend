import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { store } from "@/app/store";
import { clearCredentials, setCredentials } from "@/features/auth/authSlice";
import { refreshAccessToken } from "@/features/auth/api/authApi";

interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface ApiErrorResponse {
  message?: string;
}

interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;

let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });

  failedQueue = [];
};

export const setupRequestInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(
    (config) => {
      const accessToken = store.getState().auth.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },

    (error) => Promise.reject(error),
  );
};

export const setupResponseInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as
        | RetryableRequestConfig
        | undefined;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const status = error.response?.status;

      const isRefreshRequest = originalRequest.url?.includes(
        "/auth/refresh-token",
      );

      if (status !== 401 || originalRequest._retry || isRefreshRequest) {
        return Promise.reject(error);
      }

      const refreshToken = store.getState().auth.refreshToken;

      if (!refreshToken) {
        store.dispatch(clearCredentials());

        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (newAccessToken) => {
              originalRequest.headers = originalRequest.headers ?? {};

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

              resolve(apiClient(originalRequest));
            },

            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await refreshAccessToken(refreshToken);

        const newAccessToken = response.data.accessToken;

        const currentUser = store.getState().auth.user;

        if (!currentUser) {
          throw new Error("Authenticated user is missing.");
        }

        store.dispatch(
          setCredentials({
            user: currentUser,
            accessToken: newAccessToken,
            refreshToken,
          }),
        );

        processQueue(null, newAccessToken);

        originalRequest.headers = originalRequest.headers ?? {};

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        store.dispatch(clearCredentials());

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );
};
