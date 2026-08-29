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
  pageSize: number;
  totalMovies: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetMoviesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    movies: Movie[];
    pagination: MoviePagination;
  };
}

export interface GetMoviesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  language?: string;
  releaseStatus?: ReleaseStatus;
  sort?: string;
}
