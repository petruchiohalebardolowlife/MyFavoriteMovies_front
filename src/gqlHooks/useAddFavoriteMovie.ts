import { useMutation, gql } from "@apollo/client";
import { Movie } from "types";
import { GET_FAVORITE_MOVIES_IDS } from "./useGetFavoriteMoviesIDs";
import { useCallback } from "react";

const ADD_FAVORITE_MOVIE = gql`
  mutation addFavoriteMovie($movie: MovieInput!) {
    addFavoriteMovie(movie: $movie) {
      movieID
    }
  }
`;

export function useAddFavoriteMovie() {
  const [addFavoriteMovie] = useMutation(ADD_FAVORITE_MOVIE, {
    refetchQueries: [{ query: GET_FAVORITE_MOVIES_IDS }],
  });

  const addFavMovie = useCallback(
    async (movie: Movie): Promise<boolean> => {
      try {
        const { data } = await addFavoriteMovie({ variables: { movie } });
        return !!data?.addFavoriteMovie.movieID;
      } catch {
        return false;
      }
    },
    [addFavoriteMovie]
  );

  return addFavMovie;
}
