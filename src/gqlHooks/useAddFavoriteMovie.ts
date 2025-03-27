import { useMutation, gql } from "@apollo/client";

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
  const [addFavoriteMovie] = useMutation(ADD_FAVORITE_MOVIE);

  const addFavMovie = async (
    movieID: number,
    title: string,
    posterPath: string,
    releaseDate: string,
    voteAverage: number,
    genreIDs: number[]
  ): Promise<boolean> => {
    try {
      const { data } = await addFavoriteMovie({
        variables: {
          movieID,
          title,
          posterPath,
          releaseDate,
          voteAverage,
          genreIDs,
        },
      });
      if (!data?.addFavoriteMovie.userID) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };
  return addFavMovie;
}
