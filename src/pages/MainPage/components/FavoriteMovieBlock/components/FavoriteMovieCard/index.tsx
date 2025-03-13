import { FavoriteMovie } from "types";
import { Genre } from "@services/tmdbQuery";
import { ViewModeType } from "types";
import FavoriteMovieListCard from "./components/FavoriteMovieListCard";
import FavoriteMovieGridCard from "./components/FavoriteMovieGridCard";
import { LIST_VIEW } from "@components/constants";

export interface FavoriteMovieCardProps {
  favMovie: FavoriteMovie;
  viewMode?: ViewModeType;
  toggleWatchedStatus: (id: number) => void;
  handleDelete: (id: number) => void;
  genres: Genre[];
  number: string;
  isFavorite: boolean;
}

function FavoriteMovieCard({
  favMovie,
  viewMode,
  toggleWatchedStatus,
  handleDelete,
  genres,
  number,
}: FavoriteMovieCardProps) {
  return viewMode === LIST_VIEW ? (
    <FavoriteMovieListCard
      favMovie={favMovie}
      toggleWatchedStatus={toggleWatchedStatus}
      handleDelete={handleDelete}
      genres={genres}
      number={number}
      isFavorite={false}
    />
  ) : (
    <FavoriteMovieGridCard
      favMovie={favMovie}
      toggleWatchedStatus={toggleWatchedStatus}
      handleDelete={handleDelete}
      genres={genres}
      number={number}
      isFavorite={false}
    />
  );
}

export default FavoriteMovieCard;
