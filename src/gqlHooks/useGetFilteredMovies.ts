import { gql, useQuery } from "@apollo/client";
import { Movie } from "types";

export const GET_FILTERED_MOVIES = gql`
  query getFilteredMovies(
    $genreIDs: [Int!]
    $popularity: Float
    $year: Int
    $page: Int
    $language: String!
  ) {
    getFilteredMovies(
      filter: {
        genreIDs: $genreIDs
        popularity: $popularity
        year: $year
        page: $page
        language: $language
      }
    ) {
      totalPages
      results {
        movieID
        title
        posterPath
        voteAverage
        genreIDs
        releaseDate
      }
    }
  }
`;

function useGetFilteredMovies(
  currentPage: number,
  locale: string,
  year: number | undefined,
  popularity: number,
  genreIDs: number[]
) {
  const { data, loading, error, refetch } = useQuery(GET_FILTERED_MOVIES, {
    variables: {
      page: currentPage,
      language: locale,
      year: year,
      popularity: popularity,
      genreIDs: genreIDs,
    },
    fetchPolicy: "cache-and-network",
  });

  const movies: Movie[] = data?.getFilteredMovies.results || [];
  const totalPages = data?.getFilteredMovies.totalPages || 1;

  return {
    movies,
    totalPages,
    loading,
    refetch,
    error,
  };
}

export default useGetFilteredMovies;
