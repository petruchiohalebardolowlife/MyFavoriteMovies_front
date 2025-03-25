import { gql, useQuery } from "@apollo/client";

export const GET_GENRES = gql`
  query {
    getAllGenres {
      id
      name
    }
  }
`;

const useGetGenres = () => {
  const { data, loading, error } = useQuery(GET_GENRES, {
    fetchPolicy: "cache-and-network",
  });

  const genres = data?.getAllGenres || [];

  return {
    genres,
    loading,
    error,
  };
};

export default useGetGenres;
