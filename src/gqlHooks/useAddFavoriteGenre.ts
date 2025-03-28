import { useMutation, gql } from "@apollo/client";
import { GET_FAVORITE_GENRES } from "./useGetFavoriteGenres";
import { useCallback } from "react";

const ADD_FAVORITE_GENRE = gql`
  mutation addFavoriteGenre($genreID: ID!) {
    addFavoriteGenre(genreID: $genreID) {
      success
    }
  }
`;

export function useAddFavoriteGenre() {
  const [addFavoriteGenre] = useMutation(ADD_FAVORITE_GENRE, {
    refetchQueries: [{ query: GET_FAVORITE_GENRES }],
  });

  const addFavGenre = useCallback(
    async (genreID: number): Promise<boolean> => {
      try {
        const { data } = await addFavoriteGenre({ variables: { genreID } });
        return data?.addFavoriteGenre.success;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [addFavoriteGenre]
  );

  return addFavGenre;
}

export default useAddFavoriteGenre;
