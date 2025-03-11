import Button from "@components/Button";
import { X, Eye } from "lucide-react";

interface CardButtondProps {
  toggleWatchedStatus: (id: number) => void;
  handleDelete: (id: number) => void;
  movieid: number;
}

function FavoriteMovieCardButtons({ toggleWatchedStatus, handleDelete, movieid }: CardButtondProps) {
  return (
    <>
      <Button
        onClick={() => toggleWatchedStatus(movieid)}
        buttonView="square"
      >
        <Eye size={24} />
      </Button>
      <Button onClick={() => handleDelete(movieid)} buttonView="square">
        <X size={24} />
      </Button>
    </>
  );
}
export default FavoriteMovieCardButtons;
