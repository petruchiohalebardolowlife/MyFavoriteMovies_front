import FavoriteMovieCardButtons from "../FavoriteMovieCardButtons";
import NameOfGenres from "../../../NameOfGenres";
import { useLingui } from "@lingui/react/macro";
import { FavoriteMovieCardProps } from "../..";

const API_PICS = import.meta.env.VITE_PICS_URL;

function FavoriteMovieGridCard({
  favMovie,
  toggleWatchedStatus,
  handleDelete,
  genres,
  number,
}: FavoriteMovieCardProps) {
  const { t } = useLingui();

  return (
    <div
      className={`${
        favMovie.watchedStatus ? "grayscale opacity-50" : ""
      } flex flex-col items-center gap-4 border border-gray-400 rounded-lg bg-gray-100 px-2`}
    >
      <span>{number}</span>
      <div className="flex flex-row gap-4">
        <img
          className="my-2 max-h-64 mx-auto"
          alt={t`poster of ${favMovie.title}`}
          src={API_PICS + favMovie.posterPath}
        />
        <div className="flex flex-col">
          <FavoriteMovieCardButtons
            toggleWatchedStatus={toggleWatchedStatus}
            handleDelete={handleDelete}
            movieid={favMovie.id}
          />
        </div>
      </div>
      <p className="break-words overflow-hidden">{favMovie.title}</p>
      <span>
        {t`Primary release year: ${favMovie.releaseDate.slice(0, 4)}`}
      </span>
      <NameOfGenres genreIDs={favMovie.genreIDs} genres={genres} />
    </div>
  );
}

export default FavoriteMovieGridCard;
