import { FavoriteMovie } from "types";
import { Genre } from "@services/tmdbQuery";
import { ViewModeType } from "types";
import { LIST_VIEW } from "@components/constants";
import MovieGridCard from "@components/MovieGridCard";
import MovieListCard from "@components/MovieListCard";
import { Movie } from "types";
import { ReactNode } from "react";

export interface FavoriteMovieCardProps {
  movie: FavoriteMovie | Movie;
  viewMode?: ViewModeType;
  buttons: ReactNode;
  genres: Genre[];
  number: string;
}

function MovieCard({
  movie,
  viewMode,
  genres,
  number,
  buttons,
}: FavoriteMovieCardProps) {
  return viewMode === LIST_VIEW ? (
    <MovieListCard
      movie={movie}
      genres={genres}
      number={number}
      buttons={buttons}
    />
  ) : (
    <MovieGridCard
      movie={movie}
      genres={genres}
      number={number}
      buttons={buttons}
    />
  );
}
// />

export default MovieCard;
