import { useMutation, gql } from "@apollo/client";
import { GET_FAVORITE_GENRES } from "./useGetFavoriteGenres";
import { useCallback } from "react";

const DELETE_FAVORITE_GENRE = gql`
  mutation deleteFavoriteGenre($genreID: ID!) {
    deleteFavoriteGenre(genreID: $genreID) {
      success
    }
  }
`;

export function useDeleteFavoriteGenre() {
  const [deleteFavoriteGenre] = useMutation(DELETE_FAVORITE_GENRE, {
    refetchQueries: [{ query: GET_FAVORITE_GENRES }],
  });

  const deleteFavGenre = useCallback(
    async (genreID: number): Promise<boolean> => {
      try {
        const { data } = await deleteFavoriteGenre({ variables: { genreID } });
        if (!data?.deleteFavoriteGenre.success) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    },
    [deleteFavoriteGenre]
  );

  return deleteFavGenre;
}
