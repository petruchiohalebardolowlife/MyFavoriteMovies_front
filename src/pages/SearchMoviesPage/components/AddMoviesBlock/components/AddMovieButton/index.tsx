import Button from "@components/Button";
import { useLingui } from "@lingui/react/macro";
import { Movie } from "types";

interface AddMovieButtonProps {
  movie: Movie;
  handleAdd: (movie: Movie) => void;
  isActive: boolean;
}

function AddMovieButton({ movie, handleAdd, isActive }: AddMovieButtonProps) {
  const { t } = useLingui();
  return (
    <Button
      onClick={() => handleAdd(movie)}
      isActive={isActive}
    >{t`Add`}</Button>
  );
}

export default AddMovieButton;
