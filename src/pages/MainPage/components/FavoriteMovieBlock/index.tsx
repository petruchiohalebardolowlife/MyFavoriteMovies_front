import { useLingui } from "@lingui/react/macro";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@components/Button.tsx";
import { Genre } from "@services/tmdbQuery.ts";
import ViewButton from "@components/ViewButton";
import MovieCard from "@components/MovieCard";
import { ViewModeType, FavoriteMovie } from "types";
import { GRID_VIEW, LIST_VIEW, START_PAGE } from "@components/constants";
import getPaginatedFavoriteMovies from "@services/getFavoriteMoviesPage";
import Pagination from "@components/Pagination";
import FavoriteMovieCardButtons from "./components/FavoriteMovieCardButtons";

interface FavoriteMoviesBlockProps {
  genres: Genre[];
}

function FavoriteMoviesBlock({ genres }: FavoriteMoviesBlockProps) {
  const { t } = useLingui();
  const [viewMode, setViewMode] = useState<ViewModeType>(LIST_VIEW);
  const [currentPage, setPage] = useState(START_PAGE);
  const [moviesOnPage, setMoviesOnPage] = useState<FavoriteMovie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const addMovieClick = () => {
    navigate("/searchmovies");
  };

  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>(
    JSON.parse(localStorage.getItem("favoriteMovies") || "[]")
  );

  useEffect(() => {
    const { paginatedFavoriteMovies, totalPages } =
      getPaginatedFavoriteMovies(currentPage);
    setMoviesOnPage(paginatedFavoriteMovies);
    setTotalPages(totalPages);
  }, [currentPage, favoriteMovies]);

  const toggleWatchedStatus = (id: number) => {
    const updatedMovies = favoriteMovies.map((movie) => {
      if (movie.id === id) {
        return {
          ...movie,
          watchedStatus: !movie.watchedStatus,
        };
      }
      return movie;
    });
    setFavoriteMovies(updatedMovies);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies));
  };

  const handleDelete = (id: number) => {
    const updatedMovies = favoriteMovies.filter(
      (favMovie: FavoriteMovie) => favMovie.id !== id
    );
    setFavoriteMovies(updatedMovies);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies));
  };
  return (
    <>
      <div className="flex flex-row-reverse my-7 p-2 max-w">
        <ViewButton setViewMode={setViewMode} viewMode={viewMode} />
        <Button onClick={addMovieClick}>{t`Add movie`}</Button>
        <h1 className="mx-8 my-2 text-2xl font-medium flex-grow flex justify-center items-center">{t`Your favorite movies`}</h1>
      </div>
      <div
        className={`${
          viewMode === GRID_VIEW
            ? "grid grid-cols-4 gr gap-4"
            : "flex flex-col flex-wrap gap-6 mx-4"
        }`}
      >
        {moviesOnPage?.map((favMovie) => (
          <MovieCard
            key={favMovie.id}
            movie={favMovie}
            viewMode={viewMode}
            genres={genres}
            number={moviesOnPage.indexOf(favMovie) + 1 + "."}
            buttons={
              <FavoriteMovieCardButtons
                toggleWatchedStatus={toggleWatchedStatus}
                handleDelete={handleDelete}
                movieid={favMovie.id}
              />
            }
          />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setPage={setPage}
      />
    </>
  );
}
export default FavoriteMoviesBlock;
