import { useLingui } from "@lingui/react/macro";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@components/Button.tsx";
import { Genre } from "types";
import ViewButton from "@components/ViewButton";
import MovieCard from "@components/MovieCard";
import { ViewModeType } from "types";
import {
  GRID_VIEW,
  LIST_VIEW,
  MOVIES_PER_PAGE,
  START_PAGE,
} from "@components/constants";
import Pagination from "@components/Pagination";
import FavoriteMovieCardButtons from "./components/FavoriteMovieCardButtons";
import useGetFavoriteMovies from "@gqlHooks/useGetFavoriteMovies";
import { useToggleWatchedStatus } from "@gqlHooks/useToggleWatchedStatus";
import { useDeleteFavoriteMovie } from "@gqlHooks/useDeleteFavoriteMovie";

interface FavoriteMoviesBlockProps {
  genres: Genre[];
}

function FavoriteMoviesBlock({ genres }: FavoriteMoviesBlockProps) {
  const { t } = useLingui();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewModeType>(LIST_VIEW);
  const [currentPage, setPage] = useState(START_PAGE);
  const { moviesOnPage, totalPages, loading, error, refetchFavMovies } =
    useGetFavoriteMovies(currentPage, MOVIES_PER_PAGE);
  const toggleWatched = useToggleWatchedStatus(currentPage);
  const deleteFavMovie = useDeleteFavoriteMovie();
  const toggleWatchedStatus = (id: number) => {
    toggleWatched(id);
  };
  const handleDelete = async (id: number) => {
    await deleteFavMovie(id);
    await refetchFavMovies();
    // console.log(
    //   "total pages from refetch func",
    //   data.getFavoriteMovies.totalPages
    // );
  };
  const handleAdd = () => {
    navigate("/searchmovies");
  };

  useEffect(() => {
    console.log("Total pages from useEffect",totalPages)
    // if (!loading && moviesOnPage?.length === 0 && currentPage > START_PAGE) {
    //   setPage((prevPage) => prevPage - 1);
    // }
  }, [totalPages]);

  if (loading) return <p>Loading...</p>;
  if (totalPages === 0)
    return (
      <div className="flex text-center items-center flex-col my-7 p-2 ">
        <p>{t`You don't have any favorite movies yet, but you can add them`}</p>
        <Button className="w-xs" onClick={handleAdd}>{t`Add`}</Button>
      </div>
    );
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <div className="flex flex-row-reverse my-7 p-2 max-w">
        <ViewButton setViewMode={setViewMode} viewMode={viewMode} />
        <Button onClick={handleAdd}>{t`Add`}</Button>
        <h1 className="mx-8 my-2 text-2xl font-medium flex-grow flex justify-center items-center">{t`Your favorite movies`}</h1>
      </div>
      <div
        className={`${
          viewMode === GRID_VIEW
            ? "grid grid-cols-4 gap-4"
            : "flex flex-col flex-wrap gap-6 mx-4"
        }`}
      >
        {moviesOnPage?.map((favMovie) => (
          <MovieCard
            key={favMovie.movieID}
            movie={favMovie}
            viewMode={viewMode}
            genres={genres}
            number={moviesOnPage.indexOf(favMovie) + 1 + "."}
          >
            <FavoriteMovieCardButtons
              toggleWatchedStatus={toggleWatchedStatus}
              handleDelete={handleDelete}
              movieid={favMovie.movieID}
            />
          </MovieCard>
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
