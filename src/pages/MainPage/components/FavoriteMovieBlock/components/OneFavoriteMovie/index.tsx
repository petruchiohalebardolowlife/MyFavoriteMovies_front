import Button from "@components/Button";
import { FavoriteMovie } from "../..";
import { X, Eye } from "lucide-react";
import NameOfGenres from "../NameOfGenres";
import { useLingui } from "@lingui/react/macro";
import { Genre } from "@services/tmdbQuery";

interface OneFavoriteMovieProps {
  favMovie: FavoriteMovie;
  viewMode: "grid" | "list";
  toggleWatchedStatus: (id: number) => void;
  deleteHandleClick: (id: number) => void;
  genres: Genre[];
  number: string;
}

const API_PICS = import.meta.env.VITE_PICS_URL;

function OneFavoriteMovie({
  favMovie,
  viewMode,
  toggleWatchedStatus,
  deleteHandleClick,
  genres,
  number,
}: OneFavoriteMovieProps) {
  const { t } = useLingui();

  return viewMode === "list" ? (
    <div
      key={favMovie.id}
      className={`${
        favMovie.watchedStatus ? "grayscale opacity-50" : ""
      } flex flex-row items-center gap-4 justify-between border border-gray-400 rounded-lg bg-gray-100 px-2`}
    >
      <span>{number}</span>
      <p className="break-words overflow-hidden">{favMovie.title}</p>
      <img
        className="my-2 max-h-64"
        alt={`poster of ${favMovie.title}`}
        src={API_PICS + favMovie.posterPath}
      />
      <span>{t`Primary release year: ${favMovie.releaseDate.slice(
        0,
        4
      )}`}</span>
      <div className="flex flex-col">
        <NameOfGenres genreIDs={favMovie.genreIDs} genres={genres} />
      </div>
      <div className="flex flex-row gap-2">
        <Button
          onClick={() => toggleWatchedStatus(favMovie.id)}
          buttonView="square"
        >
          <Eye size={24} />
        </Button>
        <Button
          onClick={() => deleteHandleClick(favMovie.id)}
          buttonView="square"
        >
          <X size={24} />
        </Button>
      </div>
    </div>
  ) : (
    <div
      className={`${
        favMovie.watchedStatus ? "grayscale opacity-50" : ""
      } flex flex-col items-center gap-4 border border-gray-400 rounded-lg bg-gray-100 px-2`}
    >
      <span>{number}</span>
      <div className="flex flex-row gap-4">
        <img
          className="my-2 max-h-64 mx-auto"
          alt={`poster of ${favMovie.title}`}
          src={API_PICS + favMovie.posterPath}
        />
        <div className="flex flex-col">
          <Button
            onClick={() => toggleWatchedStatus(favMovie.id)}
            buttonView="square"
          >
            <Eye size={24} />
          </Button>
          <Button
            onClick={() => deleteHandleClick(favMovie.id)}
            buttonView="square"
          >
            <X size={24} />
          </Button>
        </div>
      </div>
      <p className="break-words overflow-hidden">{favMovie.title}</p>
      <span className="text-center">
        {t`Primary release year: ${favMovie.releaseDate.slice(0, 4)}`}
      </span>
      <div className="flex flex-col">
        <NameOfGenres genreIDs={favMovie.genreIDs} genres={genres} />
      </div>
      <div className="flex flex-row gap-2 flex-wrap"></div>
    </div>
  );
}

export default OneFavoriteMovie;
