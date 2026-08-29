import { MovieCard } from "@/features/movies/components/MovieCard";
import { useMovies } from "@/features/movies/hooks/useMovies";

export const MovieListPage = () => {
  const { data, isLoading, isError, error, refetch } = useMovies();

  if (isLoading) {
    return (
      <main>
        <h1>Movies</h1>

        <p>Loading movies...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <h1>Movies</h1>

        <p role="alert">
          {error instanceof Error ? error.message : "Unable to load movies."}
        </p>

        <button type="button" onClick={() => refetch()}>
          Try again
        </button>
      </main>
    );
  }

  const movies = data?.data.movies ?? [];

  return (
    <main>
      <h1>Movies</h1>

      {movies.length === 0 ? (
        <p>No movies found.</p>
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
