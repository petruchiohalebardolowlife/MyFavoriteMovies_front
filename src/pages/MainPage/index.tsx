import { useLingui } from "@lingui/react/macro";
import { useFetchGenres } from "@services/tmdbQuery";
import GenresBlock from "./components/GenresBlock";
import FavoriteMoviesBlock from "./components/FavoriteMovieBlock";

interface MainPageProps {
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
}
function MainPage({ viewMode, setViewMode }: MainPageProps) {
  const { t } = useLingui();
  const { isPending, error, data: genres } = useFetchGenres();

  if (isPending) return <div>{t`Loading...`}</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <GenresBlock genres={genres} />
      <FavoriteMoviesBlock
        genres={genres}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </>
  );
}

export default MainPage;
