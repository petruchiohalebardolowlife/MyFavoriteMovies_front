import NameOfGenres from "@pages/MainPage/components/FavoriteMovieBlock/components/NameOfGenres";
import { useLingui } from "@lingui/react/macro";
import { API_PICS } from "@components/constants";
import { MovieCardProps } from "./MovieGridCard";

function MovieListCard({ movie, genres, number, buttons }: MovieCardProps) {
  const { t } = useLingui();

  return (
    <div
      className={`${
        "watchedStatus" in movie && movie.watchedStatus
          ? "grayscale opacity-50"
          : ""
      } flex flex-row items-center gap-4 justify-between border border-gray-400 rounded-lg bg-gray-100 px-2`}
    >
      <span>{number}</span>
      <p className="break-words overflow-hidden">{movie.title}</p>
      <img
        className="my-2 max-h-64"
        alt={t`poster of ${movie.title}`}
        src={API_PICS + movie.posterPath}
      />
      <span>{t`Primary release year: ${movie.releaseDate.slice(0, 4)}`}</span>
      <NameOfGenres genreIDs={movie.genreIDs} genres={genres} />
      <div className="flex flex-row gap-2">{buttons}</div>
    </div>
  );
}

export default MovieListCard;
