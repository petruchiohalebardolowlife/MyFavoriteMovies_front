import { useMutation, gql } from "@apollo/client";

const ADD_FAVORITE_GENRE = gql`
  mutation addFavoriteGenre($genreID: ID!) {
    addFavoriteGenre(genreID: genreID)
  }
`;

export function useSignIn() {
  const [addFavoriteGenre] = useMutation(ADD_FAVORITE_GENRE);
  return addFavoriteGenre;
}
