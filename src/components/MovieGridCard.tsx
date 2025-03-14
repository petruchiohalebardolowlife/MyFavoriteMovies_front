import NameOfGenres from "@pages/MainPage/components/FavoriteMovieBlock/components/NameOfGenres";
import { useLingui } from "@lingui/react/macro";
import { Genre } from "@services/tmdbQuery";
import { FavoriteMovie } from "types";
import { Movie } from "types";
import { ReactNode } from "react";

const API_PICS = import.meta.env.VITE_PICS_URL;

export interface MovieCardProps {
  movie: Movie | FavoriteMovie;
  genres: Genre[];
  number: string;
  buttons: ReactNode;
}

function MovieGridCard({ movie, genres, number, buttons }: MovieCardProps) {
  const { t } = useLingui();

  return (
    <div
      className={`${
        "watchedStatus" in movie && movie.watchedStatus
          ? "grayscale opacity-50"
          : ""
      } flex flex-col items-center gap-4 border border-gray-400 rounded-lg bg-gray-100 px-2`}
    >
      <span>{number}</span>
      <div className="flex flex-row gap-4">
        <img
          className="my-2 max-h-64 mx-auto"
          alt={t`poster of ${movie.title}`}
          src={API_PICS + movie.posterPath}
        />
        <div className="flex flex-col">{buttons}</div>
      </div>
      <p className="break-words overflow-hidden">{movie.title}</p>
      <span>{t`Primary release year: ${movie.releaseDate.slice(0, 4)}`}</span>
      <NameOfGenres genreIDs={movie.genreIDs} genres={genres} />
    </div>
  );
}

export default MovieGridCard;
