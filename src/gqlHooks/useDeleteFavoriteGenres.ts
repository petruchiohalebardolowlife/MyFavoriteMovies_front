import { useMutation, gql } from "@apollo/client";
import { GET_FAVORITE_GENRES } from "./useGetFavoriteGenres";

const DELETE_FAVORITE_GENRE = gql`
  mutation deleteFavoriteGenre($genreID: ID!) {
    deleteFavoriteGenre(genreID: $genreID)
  }
`;

export function useDeleteFavoriteGenre() {
  const [deleteFavoriteGenre] = useMutation(DELETE_FAVORITE_GENRE, {
    refetchQueries: [{ query: GET_FAVORITE_GENRES }],
  });

  const deleteFavGenre = async (genreID: number): Promise<boolean> => {
    try {
      const { data } = await deleteFavoriteGenre({ variables: { genreID } });
      if (!data?.deleteFavoriteGenre) {
        return false;
      }
      return data.addFavoriteGenre;
    } catch {
      return false;
    }
  };

  return deleteFavGenre;
}
