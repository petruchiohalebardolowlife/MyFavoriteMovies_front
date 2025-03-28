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

function useGetFavoriteMovies(page: number, moviesPerPage: number) {
  const { data, loading, error, refetch } = useQuery(GET_FAVORITE_MOVIES, {
    variables: { page, moviesPerPage },
  });
  const favoriteMovies: FavoriteMovie[] = data?.getFavoriteMovies.results || [];
  const totalPages = data?.getFavoriteMovies.totalPages ?? 1;

  console.log("TOTAL PAGES FROm FILE WITH HOOK ", totalPages)

  return {
    moviesOnPage: favoriteMovies,
    totalPages,
    loading,
    refetchFavMovies: refetch,
    error,
  };
}

export default useGetFavoriteMovies;
