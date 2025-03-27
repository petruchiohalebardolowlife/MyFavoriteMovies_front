import { gql, useQuery } from "@apollo/client";

export const GET_FAVORITE_MOVIES_IDS = gql`
  query {
    getFavoriteMoviesIDs
  }
`;

function useGetFavoriteMoviesIDs() {
  const { data, loading, error } = useQuery(GET_FAVORITE_MOVIES_IDS, {
    fetchPolicy: "cache-and-network",
  });

  const favMoviesIDs = data?.getFavoriteMoviesIDs ?? [];
  return {
    favMoviesIDs,
    loading,
    error,
  };
}

export default useGetFavoriteMoviesIDs;
