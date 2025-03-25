import { useLingui } from "@lingui/react/macro";
import { useEffect } from "react";
import { Genre } from "@services/tmdbQuery";
import GenresBlock from "@components/GenresBlock";
import useGetFavoriteGenres from "@gqlHooks/useGetFavoriteGenres";
import { useAddFavoriteGenre } from "@gqlHooks/useAddFavoriteGenre";

interface GenresBlockProps {
  genres: Genre[];
}

function FavoriteGenresBlock({ genres }: GenresBlockProps) {
  const { t } = useLingui();
  const { selected } = useGetFavoriteGenres();
  console.log("Selected genres from DB", selected);

  console.log("All genres", typeof genres[0].id);

  useEffect(() => {
    localStorage.setItem("favoriteGenres", JSON.stringify(selected));
  }, [selected]);

  const addFavGenre = useAddFavoriteGenre();

  const handleAddFavoriteGenre = (id: number) => {
    addFavGenre(id)
  };

  // const toggleFavoriteGenre = (id: number) => {
  //   setSelected((prevState) =>
  //     prevState.includes(id)
  //       ? prevState.filter((genreId) => genreId !== id)
  //       : [...prevState, id]
  //   );
  // };

  return (
    <>
      <div className="flex justify-center content-center text-lg font-medium p-3 bg-gray-400">
        {t`Select your favorite genres`}
      </div>
      <div className="flex flex-wrap justify-center content-center px-4 gap-2">
        <GenresBlock
          onClick={handleAddFavoriteGenre}
          genres={genres}
          selected={selected.map(String)}
        />
      </div>
    </>
  );
}

export default FavoriteGenresBlock;
