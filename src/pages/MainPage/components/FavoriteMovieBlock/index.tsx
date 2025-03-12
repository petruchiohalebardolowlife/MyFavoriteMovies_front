import { useLingui } from "@lingui/react/macro";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@components/Button.tsx";
import { Genre } from "@services/tmdbQuery.ts";
import ViewButton from "@components/ViewButton";
import FavoriteMovieCard from "./components/FavoriteMovieCard";
import { ViewModeType } from "types";
import { GRID_VIEW, LIST_VIEW } from "@components/constants";
import { FavoriteMovie } from "types";
import { MOVIES_PER_PAGE } from "@components/constants";

interface FavoriteMoviesBlockProps {
  genres: Genre[];
  favoriteMovies: FavoriteMovie[];
  setFavoriteMovies: (movies: FavoriteMovie[]) => void;
  currentPage: number;
}

function FavoriteMoviesBlock({
  genres,
  favoriteMovies,
  setFavoriteMovies,
  currentPage,
}: FavoriteMoviesBlockProps) {
  const { t } = useLingui();
  const [viewMode, setViewMode] = useState<ViewModeType>(LIST_VIEW);
  const navigate = useNavigate();
  const addMovieClick = () => {
    navigate("/searchmovies");
  };

  const favoriteMoviesForRender = favoriteMovies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

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
            ? "grid grid-cols-4 grid-rows-3 gap-4"
            : "flex flex-col flex-wrap gap-6 mx-4"
        }`}
      >
        {favoriteMoviesForRender?.map((favMovie) => (
          <FavoriteMovieCard
            key={favMovie.id}
            favMovie={favMovie}
            viewMode={viewMode}
            toggleWatchedStatus={toggleWatchedStatus}
            handleDelete={handleDelete}
            genres={genres}
            number={favoriteMovies.indexOf(favMovie) + 1 + "."}
          />
        ))}
      </div>
    </>
  );
}
export default FavoriteMoviesBlock;
