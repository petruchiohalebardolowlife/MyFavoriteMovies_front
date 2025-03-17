import { FavoriteMovie, Movie } from "types";

export function isFavoriteMovie(
  inputMovie: Movie | FavoriteMovie
): inputMovie is FavoriteMovie {
  return (inputMovie as FavoriteMovie).watchedStatus !== undefined;
}
