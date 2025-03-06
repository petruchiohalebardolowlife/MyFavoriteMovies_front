import { Genre } from "../../services/tmdbQuery";

interface RenderGenresOfMovieProps {
  genreIDs: number[];
  genres: Genre[];
}

function RenderGenresOfMovie({ genreIDs, genres }: RenderGenresOfMovieProps) {
  return (
    <>
      {genreIDs.map((genreID) => {
        const genre = genres.find((genre) => genre.id === genreID);
        return genre ? <span key={genre.id}>{genre.name}</span> : null;
      })}
    </>
  );
}

export default RenderGenresOfMovie;
