import { useLingui } from "@lingui/react/macro";
import { useFetchGenres } from "@services/tmdbQuery";
import GenresBlock from "./components/GenresBlock";
import FavoriteMoviesBlock from "./components/FavoriteMovieBlock";

function MainPage() {
  const { t } = useLingui();
  const { isPending, error, data: genres } = useFetchGenres();

  if (isPending) return <div>{t`Loading...`}</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <GenresBlock genres={genres} />
      <FavoriteMoviesBlock genres={genres} />
    </>
  );
}

export default MainPage;
