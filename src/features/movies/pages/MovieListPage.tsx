import { MovieCard } from "@/features/movies/components/MovieCard";
import { MovieCardSkeleton } from "@/features/movies/components/MovieCardSkeleton";
import { MovieListEmpty } from "@/features/movies/components/MovieListEmpty";
import { MovieListError } from "@/features/movies/components/MovieListError";
import { useMovies } from "@/features/movies/hooks/useMovies";

const SKELETON_COUNT = 6;

export const MovieListPage = () => {
  const { data, isLoading, isError, error, refetch } = useMovies();

  if (isLoading) {
    return (
      <main>
        <h1>Movies</h1>

        <section
          aria-label="Loading movies"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {Array.from({
            length: SKELETON_COUNT,
          }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <h1>Movies</h1>

        <MovieListError
          message={
            error instanceof Error
              ? error.message
              : "Something went wrong while loading movies."
          }
          onRetry={() => refetch()}
        />
      </main>
    );
  }

  const movies = data?.data.movies ?? [];

  return (
    <main>
      <h1>Movies</h1>

      {movies.length === 0 ? (
        <MovieListEmpty />
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </section>
      )}
    </main>
  );
};
