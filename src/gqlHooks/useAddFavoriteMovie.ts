import { useMutation, gql } from "@apollo/client";
import { Movie } from "types";
import { GET_FAVORITE_MOVIES_IDS } from "./useGetFavoriteMoviesIDs";

const ADD_FAVORITE_MOVIE = gql`
  mutation addFavoriteMovie(
    $movieID: ID!
    $title: String!
    $posterPath: String!
    $releaseDate: String!
    $voteAverage: Float!
    $genreIDs: [ID!]!
  ) {
    addFavoriteMovie(
      movie: {
        movieID: $movieID
        title: $title
        posterPath: $posterPath
        releaseDate: $releaseDate
        voteAverage: $voteAverage
        genreIDs: $genreIDs
      }
    ) {
      movieID
    }
  }
`;

export function useAddFavoriteMovie() {
  const [addFavoriteMovie] = useMutation(ADD_FAVORITE_MOVIE, {
    refetchQueries: [{ query: GET_FAVORITE_MOVIES_IDS }],
  });

  const addFavMovie = async (movie: Movie): Promise<boolean> => {
    try {
      const { data } = await addFavoriteMovie({
        variables: {
          movieID: movie.id,
          title: movie.title,
          posterPath: movie.posterPath,
          releaseDate: movie.releaseDate,
          voteAverage: movie.voteAverage,
          genreIDs: movie.genreIDs,
        },
      });
      if (!data?.addFavoriteMovie.movieID) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };
  return addFavMovie;
}
