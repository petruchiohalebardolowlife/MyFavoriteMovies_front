import { Genre } from "@services/tmdbQuery";
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
          isPressed={selected.includes(genre.id)}
        >
          {genre.name}
        </Button>
      ))}
    </div>
  );
}

export default GenresBlock;
