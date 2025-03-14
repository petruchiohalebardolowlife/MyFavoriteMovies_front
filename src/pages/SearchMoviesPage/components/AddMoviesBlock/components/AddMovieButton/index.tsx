import Button from "@components/Button";
import { useLingui } from "@lingui/react/macro";
import { Movie } from "types";

interface AddMovieButtonProps {
  movie: Movie;
  handleAdd: (movie: Movie) => void;
}

function AddMovieButton({ movie, handleAdd }: AddMovieButtonProps) {
  const { t } = useLingui();
  return (
    <Button onClick={() => handleAdd(movie)}>{t`Add`}</Button>
  );
}

export default AddMovieButton;
