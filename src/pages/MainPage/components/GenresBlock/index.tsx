import { useLingui } from "@lingui/react/macro";
import { useState, useEffect } from "react";
import { Genre } from "@services/tmdbQuery";
import GenresBlock from "@components/GenresBlock";

interface GenresBlockProps {
  genres: Genre[];
}

function FavoriteGenresBlock({ genres }: GenresBlockProps) {
  const { t } = useLingui();
  const [selected, setSelected] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem("favoriteGenres") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("favoriteGenres", JSON.stringify(selected));
  }, [selected]);

  const toggleFavoriteGenre = (id: number) => {
    setSelected((prevState) =>
      prevState.includes(id)
        ? prevState.filter((genreId) => genreId !== id)
        : [...prevState, id]
    );
  };

  return (
    <>
      <div className="flex justify-center content-center text-lg font-medium my-2 p-3 bg-gray-400">
        {t`Select your favorite genres`}
      </div>
      <div className="flex flex-wrap justify-center content-center px-4 gap-2">
        <GenresBlock
          onClick={toggleFavoriteGenre}
          genres={genres}
          selected={selected}
        />
      </div>
    </>
  );
}

export default FavoriteGenresBlock;
