import { Genre } from "types";

interface NameOfGenresProps {
  genreIDs: number[];
  genres: Genre[];
}

function NameOfGenres({ genreIDs, genres }: NameOfGenresProps) {
  return (
    <div className="flex flex-col">
      {genreIDs?.map((genreID) => {
        const genre = genres.find((genre) => genre.id === Number(genreID));
        return genre ? <span key={genre.id}>{genre.name}</span> : null;
      })}
    </div>
  );
}

export default NameOfGenres;
