import { apiClient } from "@/services/api/client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  avatar?: {
    url: string;
    publicId: string;
  };
  isVerified: boolean;
}

export interface AuthData {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export const register = async (
  payload: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register",
    payload,
  );

  return response.data;
};

export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", payload);

  return response.data;
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<RefreshTokenResponse> => {
  const response = await apiClient.post<RefreshTokenResponse>(
    "/auth/refresh-token",
    {
      refreshToken,
    },
  );

  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};
