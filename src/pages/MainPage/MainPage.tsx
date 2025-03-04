import { useLingui } from "@lingui/react/macro";
import { useFetchGenres } from "../../services/tmdbQuery";
import { useState, useEffect } from "react";
import GenresBlock from "./GenresBlock";
import FavoriteMoviesBlock from "./FavMoviesBlock";
import LogoutHeader from "./LogoutHeader";

function MainPage() {
  const { t } = useLingui();
  const { isPending, error, data } = useFetchGenres();
  const [pressed, setPressed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (data?.genres && data.genres.length > 0) {
      localStorage.setItem("genres", JSON.stringify(data.genres));
    }
    
    const storedGenres = JSON.parse(localStorage.getItem("favoriteGenres") || "[]");
  
    const initialPressedState: Record<number, boolean> = {};
    storedGenres.forEach((id: number) => {
      initialPressedState[id] = true;
    });
  
    setPressed(initialPressedState);
  }, [data?.genres]);

  const handleClick = (id: number) => {
    setPressed((prevState) => {
      const newState = {
        ...prevState,
        [id]: !prevState[id],
      };

      const favoriteGenres = JSON.parse(
        localStorage.getItem("favoriteGenres") || "[]"
      );

      if (newState[id]) {
        localStorage.setItem(
          "favoriteGenres",
          JSON.stringify([...favoriteGenres, id])
        );
      } else {
        const updatedGenres = favoriteGenres.filter(
          (genreID: number) => genreID !== id
        );
        localStorage.setItem("favoriteGenres", JSON.stringify(updatedGenres));
      }
      return newState;
    });
  };

  if (isPending) return <div>{t`Loading...`}</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <LogoutHeader/>
      <GenresBlock
        genres={data.genres}
        onClick={handleClick}
        pressed={pressed}
      />
      <FavoriteMoviesBlock />
    </>
  );
}

export default MainPage;
