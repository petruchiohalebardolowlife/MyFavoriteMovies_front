import LogoutButton from "../../components/LogoutButton";
import { CREDENTIALS } from "../../services/auth";
import { useLingui } from "@lingui/react/macro";
import { useFetchGenres } from "../../services/tmdbQuery";
import { useState, useEffect } from "react";
import AddButton from "../../components/AddButton";
import GenresBlock from "./GenresBlock";

function MainPage() {
  const { t } = useLingui();
  const { isPending, error, data } = useFetchGenres();
  const [pressed, setPressed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const storedGenres = JSON.parse(
      localStorage.getItem("favoriteGenres") || "[]"
    );

    const initialPressedState: Record<number, boolean> = {};
    storedGenres.forEach((id: number) => {
      initialPressedState[id] = true;
    });

    setPressed(initialPressedState);
  }, []);

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
      <div className="flex flex-row-reverse my-1 p-2 max-w">
        <LogoutButton />
        <h1 className="mx-2 my-2 font-medium">{t`Hello, ${CREDENTIALS.username}`}</h1>
      </div>
      <GenresBlock genres={data.genres} onClick={handleClick} pressed={pressed}/>
      <div className="flex flex-row-reverse my-1 p-2 max-w">
        <AddButton />
        <button>{t`Change Style Button`}</button>
        <h1 className="mx-8 my-2 text-lg font-medium flex-grow flex justify-center items-center">{t`Your favorite movies`}</h1>
      </div>
    </>
  );
}

export default MainPage;
