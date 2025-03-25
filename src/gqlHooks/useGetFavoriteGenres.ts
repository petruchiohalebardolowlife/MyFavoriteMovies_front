import { gql, useQuery } from "@apollo/client";

export const GET_FAVORITE_GENRES = gql`
  query {
    getFavoriteGenres
  }
`;

const useGetFavoriteGenres = () => {
  const { data, loading, error } = useQuery(GET_FAVORITE_GENRES, {
    fetchPolicy: "cache-and-network",
  });

  const favoriteGenres = data?.getFavoriteGenres || [];

  return {
    selected: favoriteGenres,
    loading,
    error,
  };
};

export default useGetFavoriteGenres;
