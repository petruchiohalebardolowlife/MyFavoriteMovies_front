import { Genre } from "types";
import Button from "./Button";

interface GenresProps {
  genres: Genre[];
  onClick: (id: number) => void;
  selected: number[];
}

function GenresBlock({ genres, onClick, selected }: GenresProps) {
  return (
    <div className="flex flex-wrap justify-center content-center px-4 py-4 gap-2">
      {genres.map((genre) => (
        <Button
          onClick={() => onClick(genre.id)}
          key={genre.id}
          className={selected.includes(genre.id) ? "bg-yellow-500" : ""}
        >
          {genre.name}
        </Button>
      ))}
    </div>
  );
}

export default GenresBlock;
