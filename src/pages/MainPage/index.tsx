import { useLingui } from "@lingui/react/macro";
import { useFetchGenres } from "@services/tmdbQuery";
import FavoriteMoviesBlock from "./components/FavoriteMovieBlock";
import FavoriteGenresBlock from "./components/GenresBlock";

function MainPage() {
  const { t } = useLingui();
  const { isPending, error, data: genres } = useFetchGenres();

  if (isPending) return <div>{t`Loading...`}</div>;
  if (error) return <div>{t`Error: ${error.message}`}</div>;

  return (
    <>
      <FavoriteGenresBlock genres={genres} />
      <FavoriteMoviesBlock genres={genres} />
    </>
  );
}

export default MainPage;
