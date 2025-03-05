import { useLingui } from "@lingui/react/macro";
import { useState, useEffect } from "react";
import { Genre } from "../../services/tmdbQuery";

interface GenresBlockProps {
  genres: Genre[];
}

function GenresBlock({ genres }: GenresBlockProps) {
  const { t } = useLingui();
  const [pressed, setPressed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const storedGenres = JSON.parse(localStorage.getItem("favoriteGenres") || "[]");
    const initialPressedState: Record<number, boolean> = {};

    storedGenres.forEach((id: number) => {
      initialPressedState[id] = true;
    });

    setPressed(initialPressedState);
  }, []);

  const toggleFavoriteGenre = (id: number) => {
    setPressed((prevState) => {
      const newState = {
        ...prevState,
        [id]: !prevState[id],
      };

      const favoriteGenres = JSON.parse(localStorage.getItem("favoriteGenres") || "[]");

      if (newState[id]) {
        localStorage.setItem(
          "favoriteGenres",
          JSON.stringify([...favoriteGenres, id])
        );
      } else {
        const updatedGenres = favoriteGenres.filter((genreID: number) => genreID !== id);
        localStorage.setItem("favoriteGenres", JSON.stringify(updatedGenres));
      }

      return newState;
    });
  };

  return (
    <>
      <div className="flex justify-center content-center text-lg font-medium my-2 bg-gray p-3 bg-gray-400">
        {t`Select your favorite genres`}
      </div>
      <div className="flex flex-wrap justify-center content-center px-4 gap-2">
        {genres?.map((genre) => (
          <button
            onClick={() => toggleFavoriteGenre(genre.id)}
            key={genre.id}
            className={`py-2 px-4  ${pressed[genre.id] ? "bg-gray-300 hover:bg-gray-600" : "bg-gray-800"} text-white rounded hover:bg-gray-500`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default GenresBlock;
