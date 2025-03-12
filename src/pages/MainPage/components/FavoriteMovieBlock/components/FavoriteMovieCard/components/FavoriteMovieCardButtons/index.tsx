import Button from "@components/Button";
import { ICON_SIZE } from "@components/constants";
import { X, Eye } from "lucide-react";

interface CardButtondProps {
  toggleWatchedStatus: (id: number) => void;
  handleDelete: (id: number) => void;
  movieid: number;
}

function FavoriteMovieCardButtons({
  toggleWatchedStatus,
  handleDelete,
  movieid,
}: CardButtondProps) {
  return (
    <>
      <Button onClick={() => toggleWatchedStatus(movieid)} buttonView="square">
        <Eye size={ICON_SIZE} />
      </Button>
      <Button onClick={() => handleDelete(movieid)} buttonView="square">
        <X size={ICON_SIZE} />
      </Button>
    </>
  );
}
export default FavoriteMovieCardButtons;
