import { gql, useQuery } from "@apollo/client";

export const GET_FAVORITE_GENRES = gql`
  query {
    getFavoriteGenres
  }
`;

const useGetFavoriteGenres = () => {
  const { data, loading, error, refetch } = useQuery<{ getFavoriteGenres: number[] }>(GET_FAVORITE_GENRES, {
    fetchPolicy: "cache-and-network",
  });

  const favoriteGenres = data?.getFavoriteGenres || [];

  return {
    selected: favoriteGenres,
    loading,
    refetch,
    error,
  };
};

export default useGetFavoriteGenres;
