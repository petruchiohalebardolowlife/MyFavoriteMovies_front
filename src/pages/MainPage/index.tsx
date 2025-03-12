import { useLingui } from "@lingui/react/macro";
import { useFetchGenres } from "@services/tmdbQuery";
import GenresBlock from "./components/GenresBlock";
import FavoriteMoviesBlock from "./components/FavoriteMovieBlock";
import Pagination from "@components/Pagination";
import { MOVIES_PER_PAGE } from "@components/constants";
import { useState, useEffect } from "react";
import { FavoriteMovie } from "types";

function MainPage() {
  const { t } = useLingui();
  const { isPending, error, data: genres } = useFetchGenres();
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
  const [currentPage, setPage] = useState(1);
  const totalPages = Math.ceil(favoriteMovies.length / MOVIES_PER_PAGE);

  useEffect(() => {
    const storedFavoriteMovies = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );
    setFavoriteMovies(storedFavoriteMovies);
  }, []);

  if (isPending) return <div>{t`Loading...`}</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <GenresBlock genres={genres} />
      <FavoriteMoviesBlock
        favoriteMovies={favoriteMovies}
        genres={genres}
        setFavoriteMovies={setFavoriteMovies}
        currentPage={currentPage}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setPage={setPage}
      />
    </>
  );
}

export default MainPage;
