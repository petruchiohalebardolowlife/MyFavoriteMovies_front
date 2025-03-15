import { LIST_VIEW } from "@components/constants";
import ViewButton from "@components/ViewButton";
import { useLingui } from "@lingui/react/macro";
import { useState, useEffect } from "react";
import { Movie, ViewModeType } from "types";
import AddMoviesBlock from "./components/AddMoviesBlock";
import { useFetchGenres } from "@services/tmdbQuery";

function SearchMoviesPage() {
  const [viewMode, setViewMode] = useState<ViewModeType>(LIST_VIEW);
  const { t } = useLingui();
  const { isPending, error, data: genres } = useFetchGenres();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>(() => {
    return JSON.parse(localStorage.getItem("favoriteMovies") || "[]");
  });

  const handleAdd = (movie: Movie) => {
    setFavoriteMovies((prevState) => [...prevState, movie]);
  };

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  if (isPending) return <div>{t`Loading...`}</div>;
  if (error) return <div>{t`Error: ${error.message}`}</div>;

  return (
    <>
      <h1 className="text-center text-xl">{t`Here you can find movies`}</h1>
      <div className="flex flex-row-reverse">
        <ViewButton viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <AddMoviesBlock
        genres={genres}
        viewMode={viewMode}
        handleAdd={handleAdd}
        favoriteMovies={favoriteMovies}
      />
    </>
  );
}

export default SearchMoviesPage;
