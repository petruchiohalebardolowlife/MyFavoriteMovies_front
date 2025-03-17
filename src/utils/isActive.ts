import { Movie } from "types";

interface isActiveProps {
  favoriteMovies: Movie[];
  movieid: number;
}

export function alreadyInFavorites({ favoriteMovies, movieid }: isActiveProps) {
  return favoriteMovies.some((favMovie) => favMovie.id === movieid);
}
