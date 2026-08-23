import axios from "axios";

export interface ApiError {
  status: number | null;
  message: string;
  code?: string;
  details?: unknown;
}

export const normalizeApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null;

    const message =
      error.response?.data?.message ??
      error.message ??
      "An unexpected error occurred";

    return {
      status,
      message,
      code: error.code,
      details: error.response?.data,
    };
  }

  if (error instanceof Error) {
    return {
      status: null,
      message: error.message,
    };
  }

  return {
    status: null,
    message: "An unexpected error occurred",
  };
};
