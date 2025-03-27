import { gql, useQuery } from "@apollo/client";
import { FavoriteMovie } from "types";

export const GET_FAVORITE_MOVIES = gql`
  query getFavoriteMovies($page: Int!, $moviesPerPage: Int!) {
    getFavoriteMovies(page: $page, moviesPerPage: $moviesPerPage) {
      page
      totalPages
      results {
        movieID
        title
        posterPath
        voteAverage
        watchedStatus
        releaseDate
        genreIDs
      }
    }
  }
`;

const useGetFavoriteMovies = (currentPage: number, moviesPerPage: number) => {
  const { data, loading, error, refetch } = useQuery(GET_FAVORITE_MOVIES, {
    variables: { page: currentPage, moviesPerPage },
    fetchPolicy: "cache-and-network",
  });

  const favoriteMovies: FavoriteMovie[] = data?.getFavoriteMovies.results || [];
  const totalPages = data?.getFavoriteMovies.totalPages ?? 1;
  return {
    moviesOnPage: favoriteMovies,
    totalPages,
    loading,
    refetch,
    error,
  };
};

export default useGetFavoriteMovies;
