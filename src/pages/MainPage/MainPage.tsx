import { useLingui } from "@lingui/react/macro";
import { useFetchGenres } from "../../services/tmdbQuery";
import { useEffect } from "react";
import GenresBlock from "./GenresBlock";
import FavoriteMoviesBlock from "./FavMoviesBlock";
import LogoutHeader from "./LogoutHeader";

function MainPage() {
  const { t } = useLingui();
  const { isPending, error, data } = useFetchGenres();
  
  useEffect(() => {
    if (data?.genres && data.genres.length > 0) {
      localStorage.setItem("genres", JSON.stringify(data.genres));
    }
  }, [data?.genres]);

  if (isPending) return <div>{t`Loading...`}</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <LogoutHeader />
      <GenresBlock genres={data.genres} />
      <FavoriteMoviesBlock />
    </>
  );
}

export default MainPage;
