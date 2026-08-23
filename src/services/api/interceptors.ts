import type { AxiosInstance } from "axios";

export const setupRequestInterceptor = (client: AxiosInstance): void => {
  client.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = "Bearer ${accessToken}";
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
};

export const setupResponseInterceptor = (client: AxiosInstance): void => {
  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );
};
