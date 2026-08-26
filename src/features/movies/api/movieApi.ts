import { apiClient } from "@/services/api/client";

import type {
  GetMoviesParams,
  GetMoviesResponse,
} from "@/features/movies/types/movie.types";

export const getMovies = async (
  params?: GetMoviesParams,
): Promise<GetMoviesResponse> => {
  const response = await apiClient.get<GetMoviesResponse>("/movies", {
    params,
  });

  return response.data;
};
