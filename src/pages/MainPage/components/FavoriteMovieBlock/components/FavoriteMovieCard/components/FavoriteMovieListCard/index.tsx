import NameOfGenres from "../../../NameOfGenres";
import { useLingui } from "@lingui/react/macro";
import { FavoriteMovieCardProps } from "../..";
import FavoriteMovieCardButtons from "../FavoriteMovieCardButtons";

const API_PICS = import.meta.env.VITE_PICS_URL;

function FavoriteMovieListCard({
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
      } flex flex-row items-center gap-4 justify-between border border-gray-400 rounded-lg bg-gray-100 px-2`}
    >
      <span>{number}</span>
      <p className="break-words overflow-hidden">{favMovie.title}</p>
      <img
        className="my-2 max-h-64"
        alt={t`poster of ${favMovie.title}`}
        src={API_PICS + favMovie.posterPath}
      />
      <span>
        {t`Primary release year: ${favMovie.releaseDate.slice(0, 4)}`}
      </span>
      <NameOfGenres genreIDs={favMovie.genreIDs} genres={genres} />
      <div className="flex flex-row gap-2">
        <FavoriteMovieCardButtons
          toggleWatchedStatus={toggleWatchedStatus}
          handleDelete={handleDelete}
          movieid={favMovie.id}
        />
      </div>
    </div>
  );
}

export default FavoriteMovieListCard;
