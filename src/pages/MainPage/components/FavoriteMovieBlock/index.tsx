import { useLingui } from "@lingui/react/macro";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@components/Button.tsx";
import { Genre } from "@services/tmdbQuery.ts";
import ViewButton from "@components/ViewButton";
import OneFavoriteMovie from "./components/OneMovie";

export interface FavoriteMovie {
  id: number;
  title: string;
  posterPath: string;
  genreIDs: number[];
  releaseDate: string;
  watchedStatus: boolean;
}

interface FavoriteMoviesBlockProps {
  genres: Genre[];
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
}

function FavoriteMoviesBlock({
  genres,
  setViewMode,
  viewMode,
}: FavoriteMoviesBlockProps) {
  const { t } = useLingui();
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
  const navigate = useNavigate();
  const addMovieClick = () => {
    navigate("/searchmovies");
  };

  useEffect(() => {
    const storedFavoriteMovies = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );
    setFavoriteMovies(storedFavoriteMovies);
  }, []);

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

  const deleteHandleClick = (id: number) => {
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
          viewMode === "grid"
            ? "grid grid-cols-4 grid-rows-3 gap-4"
            : "flex flex-col flex-wrap gap-6 mx-4"
        }`}
      >
        {favoriteMovies?.map((favMovie) => (
          <OneFavoriteMovie
            key={favMovie.id}
            favMovie={favMovie}
            viewMode={viewMode}
            toggleWatchedStatus={toggleWatchedStatus}
            deleteHandleClick={deleteHandleClick}
            genres={genres}
            number={favoriteMovies.indexOf(favMovie) + 1 + "."}
          ></OneFavoriteMovie>
        ))}
      </div>
    </>
  );
}
export default FavoriteMoviesBlock;
