export type ReleaseStatus = "upcoming" | "released" | "ended";

export interface Movie {
  _id: string;
  title: string;
  description: string;
  casts: string[];
  trailerUrl: string;
  language: string;
  releaseDate: string;
  director: string;
  releaseStatus: ReleaseStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MoviePagination {
  currentPage: number;
  totalPages: number;
  totalMovies: number;
  limit: number;
}

export interface GetMoviesResponse {
  movies: Movie[];
  pagination: MoviePagination;
}

export interface GetMoviesParams {
  page?: number;
  limit?: number;
  search?: string;
  language?: string;
  releaseStatus?: ReleaseStatus;
  sort?: string;
}
