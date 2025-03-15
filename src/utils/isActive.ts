import { Movie } from "types";

interface isActiveProps {
  favoriteMovies: Movie[];
  movieid: number;
}

export function alreadyInFavorites({ favoriteMovies, movieid }: isActiveProps) {
  console.log("Checking movie:", movieid);
  console.log(
    "Favorite movies:",
    favoriteMovies.map((m) => m.id)
  );

  return favoriteMovies.some((favMovie) => favMovie.id === movieid);
}
