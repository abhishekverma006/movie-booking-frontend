interface MovieListErrorProps {
  message: string;
  onRetry: () => void;
}

export const MovieListError = ({ message, onRetry }: MovieListErrorProps) => {
  return (
    <section role="alert">
      <h2>Unable to load movies</h2>

      <p>{message}</p>

      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </section>
  );
};
