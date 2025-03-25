import { useLingui } from "@lingui/react/macro";
import FavoriteMoviesBlock from "./components/FavoriteMovieBlock";
import FavoriteGenresBlock from "./components/GenresBlock";
import useGetGenres from "@gqlHooks/useGetGenres";

function MainPage() {
  const { t } = useLingui();
  const { loading, error, genres } = useGetGenres();
  if (loading) return <div>{t`Loading...`}</div>;
  if (error) return <div>{t`Error: ${error.message}`}</div>;

  return (
    <>
      <FavoriteGenresBlock genres={genres} />
      <FavoriteMoviesBlock genres={genres} />
    </>
  );
}

export default MainPage;
