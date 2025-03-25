import { useLingui } from "@lingui/react/macro";
import { useEffect } from "react";
import { Genre } from "@services/tmdbQuery";
import GenresBlock from "@components/GenresBlock";
import useGetFavoriteGenres from "@gqlHooks/useGetFavoriteGenres";
import { useAddFavoriteGenre } from "@gqlHooks/useAddFavoriteGenre";
import { useDeleteFavoriteGenre } from "@gqlHooks/useDeleteFavoriteGenres";

interface GenresBlockProps {
  genres: Genre[];
}

function FavoriteGenresBlock({ genres }: GenresBlockProps) {
  const { t } = useLingui();
  const { selected } = useGetFavoriteGenres();

  useEffect(() => {
    localStorage.setItem("favoriteGenres", JSON.stringify(selected));
  }, [selected]);

  const addFavGenre = useAddFavoriteGenre();
  const deleteFavGenre = useDeleteFavoriteGenre();

  const handleAddFavoriteGenre = (id: number) => {
    if (selected.includes(Number(id))) {
      // console.log("Dont work");
      deleteFavGenre(id);
    } else {
      addFavGenre(id);
    }
  };

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
