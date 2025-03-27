import { LIST_VIEW } from "@components/constants";
import ViewButton from "@components/ViewButton";
import { useLingui } from "@lingui/react/macro";
import { useState } from "react";
import { Movie, ViewModeType } from "types";
import AddMoviesBlock from "./components/AddMoviesBlock";
import useGetGenres from "@gqlHooks/useGetGenres";
import { useLocale } from "@contexts/localeContext";
import { useAddFavoriteMovie } from "@gqlHooks/useAddFavoriteMovie";
import useGetFavoriteMoviesIDs from "@gqlHooks/useGetFavoriteMoviesIDs";

function SearchMoviesPage() {
  const [viewMode, setViewMode] = useState<ViewModeType>(LIST_VIEW);
  const { t } = useLingui();
  const { locale } = useLocale();
  const addFavMovie = useAddFavoriteMovie();
  const { loading, error, genres } = useGetGenres(locale);
  const { favMoviesIDs } = useGetFavoriteMoviesIDs();
  const handleAdd = (movie: Movie) => {
    addFavMovie(movie);
  };

  if (loading) return <div>{t`Loading...`}</div>;
  if (error) return <div>{t`Error: ${error.message}`}</div>;

  return (
    <>
      <h1 className="flex justify-center content-center text-lg font-medium p-3 bg-gray-400">{t`Here you can find movies`}</h1>
      <div className="flex flex-row-reverse my-2">
        <ViewButton viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <AddMoviesBlock
        genres={genres}
        viewMode={viewMode}
        handleAdd={handleAdd}
        favoriteMoviesIDs={favMoviesIDs}
      />
    </>
  );
}

export default SearchMoviesPage;
