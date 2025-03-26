import { useMutation, gql } from "@apollo/client";
import { GET_FAVORITE_MOVIES } from "./useGetFavoriteMovies";
import { MOVIES_PER_PAGE } from "@components/constants";

const DELETE_FAVORITE_MOVIE = gql`
  mutation deleteFavoriteMovie($favMovieID: ID!) {
    deleteFavoriteMovie(favMovieID: $favMovieID)
  }
`;

export function useDeleteFavoriteMovie(page: number) {
  const [deleteFavoriteMovie] = useMutation(DELETE_FAVORITE_MOVIE, {
    refetchQueries: [
      {
        query: GET_FAVORITE_MOVIES,
        variables: { page: page, moviesPerPage: MOVIES_PER_PAGE },
      },
    ],
  });

  const deleteFavMovie = async (favMovieID: number): Promise<boolean> => {
    try {
      const { data } = await deleteFavoriteMovie({ variables: { favMovieID } });
      if (!data?.deleteFavoriteMovie) {
        return false;
      }
      return data.deleteFavoriteMovie;
    } catch {
      return false;
    }
  };
  return deleteFavMovie;
}
