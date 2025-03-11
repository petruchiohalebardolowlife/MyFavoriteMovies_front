import { FavoriteMovie } from "../..";
import { Genre } from "@services/tmdbQuery";
import { ViewModeType } from "types";
import FavoriteMovieListCard from "./components/FavoriteMovieListCard";
import FavoriteMovieGridCard from "./components/FavoriteMovieGridCard";

export interface FavoriteMovieCardProps {
  favMovie: FavoriteMovie;
  viewMode?: ViewModeType;
  toggleWatchedStatus: (id: number) => void;
  handleDelete: (id: number) => void;
  genres: Genre[];
  number: string;
}

function FavoriteMovieCard({
  favMovie,
  viewMode,
  toggleWatchedStatus,
  handleDelete,
  genres,
  number,
}: FavoriteMovieCardProps) {
  return viewMode === "list" ? (
    <FavoriteMovieListCard
      favMovie={favMovie}
      toggleWatchedStatus={toggleWatchedStatus}
      handleDelete={handleDelete}
      genres={genres}
      number={number}
    />
  ) : (
    <FavoriteMovieGridCard
      favMovie={favMovie}
      toggleWatchedStatus={toggleWatchedStatus}
      handleDelete={handleDelete}
      genres={genres}
      number={number}
    />
  );
}

export default FavoriteMovieCard;
