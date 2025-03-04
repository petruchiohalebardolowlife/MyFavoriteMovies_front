import { useLingui } from "@lingui/react/macro";
import { useNavigate } from "react-router-dom";
import { favoriteMovies } from "./Mock";

const API_PICS = import.meta.env.VITE_PICS_URL;

function FavoriteMoviesBlock() {
  const { t } = useLingui();
  const genres: { id: number; name: string }[] = JSON.parse(
    localStorage.getItem("genres") || "[]"
  );
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/searchmovies");
  };
  return (
    <>
      <div className="flex flex-row-reverse my-1 p-2 max-w">
        <button
          onClick={handleClick}
          className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-400"
        >
          {t`Add movie`}
        </button>
        <button className="mx-2 py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:bg-gray-400">{t`Change Style Button`}</button>
        <h1 className="mx-8 my-2 text-lg font-medium flex-grow flex justify-center items-center">{t`Your favorite movies`}</h1>
      </div>
      <div className="flex flex-col gap-6 mx-4">
        {favoriteMovies?.map((favMovie) => (
          <div className="flex items-center gap-4 grid grid-cols-[20px_150px_100px_200px_200px]">
            <span className="">{favoriteMovies.indexOf(favMovie) + 1 +"." }</span>
            <h1>{favMovie.title}</h1>
            <img src={API_PICS + favMovie.posterPath} />
            <span>{t`Primary release year ${favMovie.releaseDate.slice(
              0,
              4
            )}`}</span>
            <div className="flex flex-col">
              {favMovie.genreIDs.map((genreID) => {
                const genre = genres.find((genre) => genre.id === genreID);
                return genre ? <span>{genre.name}</span> : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteMoviesBlock;
