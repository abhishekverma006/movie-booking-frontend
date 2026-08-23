import { apiClient } from "../client";
import { normalizeApiError } from "../errors";

export const getHealth = async () => {
  try {
    const response = await apiClient.get("/health");
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};
