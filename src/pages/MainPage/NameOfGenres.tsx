import { Genre } from "../../services/tmdbQuery";

interface NameOfGenresProps {
  genreIDs: number[];
  genres: Genre[];
}

function NameOfGenres({ genreIDs, genres }: NameOfGenresProps) {
  return (
    <>
      {genreIDs.map((genreID) => {
        const genre = genres.find((genre) => genre.id === genreID);
        return genre ? <span key={genre.id}>{genre.name}</span> : null;
      })}
    </>
  );
}

export default NameOfGenres;
