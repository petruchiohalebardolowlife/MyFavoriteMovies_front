import { useLingui } from "@lingui/react/macro";
import { useNavigate } from "react-router-dom";
import { List, Grid, X, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@components/Button.tsx";
import NameOfGenres from "../GenresBlock/components/NameOfGenres/index.tsx";
import { Genre } from "@services/tmdbQuery.ts";

const API_PICS = import.meta.env.VITE_PICS_URL;

interface FavoriteMovie {
  id: number;
  title: string;
  posterPath: string;
  genreIDs: number[];
  releaseDate: string;
  watchedStatus: boolean;
}

interface FavoriteMoviesBlockProps {
  genres: Genre[];
}

function FavoriteMoviesBlock({ genres }: FavoriteMoviesBlockProps) {
  const { t } = useLingui();
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
  const [view, setView] = useState<"list" | "grid">("list");
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
        <Button onClick={() => setView("grid")} isActive={view === "grid"}>
          <Grid size={24} />
        </Button>
        <Button onClick={() => setView("list")} isActive={view === "list"}>
          <List size={24} />
        </Button>
        <Button onClick={addMovieClick}>{t`Add movie`}</Button>
        <h1 className="mx-8 my-2 text-2xl font-medium flex-grow flex justify-center items-center">{t`Your favorite movies`}</h1>
      </div>
      <div className="flex flex-col gap-6 mx-4">
        {favoriteMovies?.map((favMovie) => (
          <div
            key={favMovie.id}
            className={`${
              favMovie.watchedStatus ? "grayscale opacity-50" : ""
            } flex flex-row items-center gap-4 justify-between border border-gray-400 rounded-lg bg-gray-100 px-2 text-xl`}
          >
            <span>{favoriteMovies.indexOf(favMovie) + 1 + "."}</span>
            <p className="break-words overflow-hidden">{favMovie.title}</p>
            <img
              className="my-2 max-h-64"
              alt={`poster of ${favMovie.title}`}
              src={API_PICS + favMovie.posterPath}
            />
            <span className="text-center">{t`Primary release year: ${favMovie.releaseDate.slice(
              0,
              4
            )}`}</span>
            <div className="flex flex-col">
              <NameOfGenres genreIDs={favMovie.genreIDs} genres={genres} />
            </div>
            <div className="flex flex-row gap-2">
              <Button
                onClick={() => toggleWatchedStatus(favMovie.id)}
                buttonView="square"
              >
                <Eye size={24} />
              </Button>
              <Button
                onClick={() => deleteHandleClick(favMovie.id)}
                buttonView="square"
              >
                <X size={24} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default FavoriteMoviesBlock;
