import { useMutation, gql } from "@apollo/client";

const ADD_FAVORITE_GENRE = gql`
  mutation addFavoriteGenre($genreID: ID!) {
    addFavoriteGenre(genreID: $genreID)
  }
`;

export function useAddFavoriteGenre() {
  const [addFavoriteGenre] = useMutation(ADD_FAVORITE_GENRE);

  const addFavGenre = async (genreID: number): Promise<number> => {
    try {
      const { data } = await addFavoriteGenre({ variables: { genreID } });
      if (!data?.getFavoriteGenres) {
        return 0;
      }
      return data.addFavoriteGenre;
    } catch {
      return 0;
    }
  };

  return addFavGenre;
}
