import { Movie } from "types";

interface alreadyInFavoritesProps {
  favoriteMovies: Movie[];
  movieid: number;
}

export function alreadyInFavorites({
  favoriteMovies,
  movieid,
}: alreadyInFavoritesProps) {
  return favoriteMovies.some((favMovie) => favMovie.id === movieid);
}
