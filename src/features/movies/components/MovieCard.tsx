import type { Movie } from "@/features/movies/types/movie.types";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const releaseDate = new Date(movie.releaseDate).toLocaleDateString();

  return (
    <article>
      <header>
        <h2>{movie.title}</h2>

        <span>{movie.releaseStatus}</span>
      </header>

      <p>{movie.description}</p>

      <dl>
        <div>
          <dt>Language</dt>
          <dd>{movie.language}</dd>
        </div>

        <div>
          <dt>Director</dt>
          <dd>{movie.director}</dd>
        </div>

        <div>
          <dt>Release Date</dt>
          <dd>{releaseDate}</dd>
        </div>
      </dl>

      {movie.casts.length > 0 && (
        <div>
          <h3>Cast</h3>

          <ul>
            {movie.casts.map((cast) => (
              <li key={cast}>{cast}</li>
            ))}
          </ul>
        </div>
      )}

      {movie.trailerUrl && (
        <a href={movie.trailerUrl} target="_blank" rel="noreferrer">
          Watch Trailer
        </a>
      )}
    </article>
  );
};
