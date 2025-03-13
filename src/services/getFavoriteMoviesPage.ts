import { FavoriteMovie } from "types";
import { MOVIES_PER_PAGE } from "@components/constants";

function getFavoriteMoviesPage(page: number) {
  const storedFavoriteMovies: FavoriteMovie[] = JSON.parse(
    localStorage.getItem("favoriteMovies") || "[]"
  );
  const totalPages = Math.ceil(storedFavoriteMovies.length / MOVIES_PER_PAGE);
  const paginatedFavoriteMovies = storedFavoriteMovies.slice(
    (page - 1) * MOVIES_PER_PAGE,
    page * MOVIES_PER_PAGE
  );
  return {
    paginatedFavoriteMovies: paginatedFavoriteMovies,
    totalPages: totalPages,
  };
}

export default getFavoriteMoviesPage;
