import { useLingui } from "@lingui/react/macro";
import { useNavigate } from "react-router-dom";
import {List, Grid, X, Eye} from "lucide-react"
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
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([])
  const genres: { id: number; name: string }[] = JSON.parse(
    localStorage.getItem("genres") || "[]"
  );
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/searchmovies");
  };

  useEffect(() => {
    const storedFavoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies") || "[]");
    setFavoriteMovies(storedFavoriteMovies);
  }, [])

  const toggleWatchedStatus = (id: number) => {
   const updatedMovies = favoriteMovies.map((movie) => {
    if (movie.id === id) {
      return {
        ...movie, 
        watchedStatus: !movie.watchedStatus
      }
    }
    return movie;
   })
   setFavoriteMovies(updatedMovies);
   localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies));
  }
  
  return (
    <>
      <div className="flex flex-row-reverse my-7 p-2 max-w">
        <button className="mx-1 py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-400"><List size={24} /></button>
        <button className="mx-1 py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-400"><Grid size={24} /></button>
        <button
          onClick={handleClick}
          className="mx-4 py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-400"
        >
          {t`Add movie`}
        </button>
        <h1 className="mx-8 my-2 text-2xl font-medium flex-grow flex justify-center items-center">{t`Your favorite movies`}</h1>
      </div>
      <div className="flex flex-col gap-6 mx-4">
        {favoriteMovies?.map((favMovie) => (
          <div className={`${favMovie.watchedStatus ? "grayscale opacity-50" : ""} flex items-center gap-4 grid grid-cols-[20px_150px_100px_200px_200px_50px_50px] border border-gray-400 rounded-lg bg-gray-100 px-2`}>
            <span className="">{favoriteMovies.indexOf(favMovie) + 1 +"." }</span>
            <h1 className="break-words overflow-hidden">{favMovie.title}</h1>
            <img className="my-2" src={API_PICS + favMovie.posterPath} />
            <span>{t`Primary release year: ${favMovie.releaseDate.slice(
              0,
              4
            )}`}</span>
            <div className="flex flex-col">
              {favMovie.genreIDs.map((genreID) => {
                const genre = genres.find((genre) => genre.id === genreID);
                return genre ? <span>{genre.name}</span> : null;
              })}
            </div>
            <button onClick={() => toggleWatchedStatus(favMovie.id)} className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded"><Eye size={24}/></button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-400 rounded"><X size={24}/></button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteMoviesBlock;
