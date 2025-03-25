import { gql, useQuery } from "@apollo/client";

export const GET_GENRES = gql`
  query getAllGenres($language: String!) {
    getAllGenres(language: $language) {
      id
      name
    }
  }
`;

const useGetGenres = (language: string) => {
  const { data, loading, error } = useQuery(GET_GENRES, {
    variables: { language },
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
