import { Movie } from "types";

interface AlreadyInFavoritesProps {
  favoriteMovies: Movie[];
  movieid: number;
}

export function alreadyInFavorites({
  favoriteMovies,
  movieid,
}: AlreadyInFavoritesProps) {
  return favoriteMovies.some((favMovie) => favMovie.id === movieid);
}
