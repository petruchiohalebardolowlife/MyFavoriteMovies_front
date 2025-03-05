import { useLingui } from "@lingui/react/macro";
import { useNavigate } from "react-router-dom";
import { List, Grid, X, Eye } from "lucide-react";
import { useEffect, useState } from "react";

const API_PICS = import.meta.env.VITE_PICS_URL;

interface FavoriteMovie {
  id: number;
  title: string;
  posterPath: string;
  genreIDs: number[];
  releaseDate: string;
  watchedStatus: boolean;
}

function FavoriteMoviesBlock() {
  const { t } = useLingui();
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
  const genres: { id: number; name: string }[] = JSON.parse(
    localStorage.getItem("genres") || "[]"
  );
  const navigate = useNavigate();
  const handleClick = () => {
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
        <button className="button">
          <List size={24} />
        </button>
        <button className="button">
          <Grid size={24} />
        </button>
        <button onClick={handleClick} className="button">
          {t`Add movie`}
        </button>
        <h1 className="mx-8 my-2 text-2xl font-medium flex-grow flex justify-center items-center">{t`Your favorite movies`}</h1>
      </div>
      <div className="flex flex-col gap-6 mx-4">
        {favoriteMovies?.map((favMovie) => (
          <div
            className={`${
              favMovie.watchedStatus ? "grayscale opacity-50" : ""
            } "flex items-center gap-4 grid grid-cols-[5%_10%_10%_25%_37%_4%_4%] border border-gray-400 rounded-lg bg-gray-100 px-2 text-xl`}
          >
            <span>{favoriteMovies.indexOf(favMovie) + 1 + "."}</span>
            <h1 className="break-words overflow-hidden">{favMovie.title}</h1>
            <img className="my-2" src={API_PICS + favMovie.posterPath} />
            <span className="text-center">{t`Primary release year: ${favMovie.releaseDate.slice(
              0,
              4
            )}`}</span>
            <div className="flex flex-col">
              {favMovie.genreIDs.map((genreID) => {
                const genre = genres.find((genre) => genre.id === genreID);
                return genre ? <span>{genre.name}</span> : null;
              })}
            </div>
            <button
              onClick={() => toggleWatchedStatus(favMovie.id)}
              className="squareButton"
            >
              <Eye size={24} />
            </button>
            <button
              onClick={() => deleteHandleClick(favMovie.id)}
              className="squareButton"
            >
              <X size={24} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default FavoriteMoviesBlock;
