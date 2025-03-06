import { useLingui } from "@lingui/react/macro";
import { useState, useEffect } from "react";
import { Genre } from "../../services/tmdbQuery";

interface GenresBlockProps {
  genres: Genre[];
}

function GenresBlock({ genres }: GenresBlockProps) {
  const { t } = useLingui();
  const [selected, setSelected] = useState<Record<number, boolean>>(() => {
    const storedGenres = localStorage.getItem("favoriteGenres");
    if (storedGenres) {
      const parsedGenres = JSON.parse(storedGenres);
      const initialSelectedState: Record<number, boolean> = {};
      parsedGenres.forEach((id: number) => {
        initialSelectedState[id] = true;
      });
      return initialSelectedState;
    }
    return [];
  });

  useEffect(() => {
    const updatedGenres = Object.keys(selected)
      .filter((key) => selected[parseInt(key)])
      .map((key) => parseInt(key));

    localStorage.setItem("favoriteGenres", JSON.stringify(updatedGenres));
  }, [selected]);

  const toggleFavoriteGenre = (id: number) => {
    setSelected((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <div className="flex justify-center content-center text-lg font-medium my-2 bg-gray p-3 bg-gray-400">
        {t`Select your favorite genres`}
      </div>
      <div className="flex flex-wrap justify-center content-center px-4 gap-2">
        {genres.map((genre) => (
          <button
            onClick={() => toggleFavoriteGenre(genre.id)}
            key={genre.id}
            className={`py-2 px-4  ${
              selected[genre.id]
                ? "bg-gray-300 hover:bg-gray-600"
                : "bg-gray-800"
            } text-white rounded hover:bg-gray-500`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default GenresBlock;
