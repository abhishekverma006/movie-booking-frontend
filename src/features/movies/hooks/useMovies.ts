import { useQuery } from "@tanstack/react-query";

import { getMovies } from "@/features/movies/api/movieApi";
import type { GetMoviesParams } from "@/features/movies/types/movie.types";

export const movieQueryKeys = {
  all: ["movies"] as const,

  lists: () => [...movieQueryKeys.all, "list"] as const,

  list: (params?: GetMoviesParams) =>
    [...movieQueryKeys.lists(), params] as const,
};

export const useMovies = (params?: GetMoviesParams) => {
  return useQuery({
    queryKey: movieQueryKeys.list(params),
    queryFn: () => getMovies(params),
  });
};
