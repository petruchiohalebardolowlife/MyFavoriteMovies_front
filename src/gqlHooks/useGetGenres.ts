import { gql, useQuery } from "@apollo/client";
import { Genre } from "types";

export const GET_GENRES = gql`
  query getAllGenres($language: String!) {
    getAllGenres(language: $language) {
      id
      name
    }
  }
`;

function useGetGenres(language: string) {
  const { data, loading, error } = useQuery<{ getAllGenres: Genre[] }>(
    GET_GENRES,
    {
      variables: { language },
      fetchPolicy: "cache-and-network",
    }
  );

  const genres = data?.getAllGenres || [];
  const convertedGenres = genres?.map((genre) => ({
    ...genre,
    id: Number(genre.id),
  }));

  return {
    genres: convertedGenres,
    loading,
    error,
  };
}

export default useGetGenres;
