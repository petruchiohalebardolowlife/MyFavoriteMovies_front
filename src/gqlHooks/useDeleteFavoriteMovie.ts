import { useMutation, gql } from "@apollo/client";
import { GET_FAVORITE_MOVIES } from "./useGetFavoriteMovies";
import { MOVIES_PER_PAGE } from "@components/constants";
import { useCallback } from "react";

const DELETE_FAVORITE_MOVIE = gql`
  mutation deleteFavoriteMovie($favMovieID: ID!) {
    deleteFavoriteMovie(favMovieID: $favMovieID) {
      success
    }
  }
`;

export function useDeleteFavoriteMovie() {
  const [deleteFavoriteMovie] = useMutation(DELETE_FAVORITE_MOVIE,{fetchPolicy:"no-cache"});

  const deleteFavMovie = useCallback(
    async (favMovieID: number): Promise<boolean> => {
      try {
        const { data } = await deleteFavoriteMovie({
          variables: { favMovieID },
        });
        if (!data?.deleteFavoriteMovie.success) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    },
    [deleteFavoriteMovie]
  );
  return deleteFavMovie;
}
