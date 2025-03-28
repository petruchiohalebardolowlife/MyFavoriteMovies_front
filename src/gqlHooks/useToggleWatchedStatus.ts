import { useMutation, gql } from "@apollo/client";
import { GET_FAVORITE_MOVIES } from "./useGetFavoriteMovies";
import { MOVIES_PER_PAGE } from "@components/constants";
import { useCallback } from "react";

const TOGGLE_WATCHED_STATUS = gql`
  mutation toggleWatchedStatus($favMovieID: ID!) {
    toggleWatchedStatus(favMovieID: $favMovieID) {
      watchedStatus
    }
  }
`;

export function useToggleWatchedStatus(page: number) {
  const [toggleWatchedStatus] = useMutation(TOGGLE_WATCHED_STATUS, {
    refetchQueries: [
      {
        query: GET_FAVORITE_MOVIES,
        variables: { page: page, moviesPerPage: MOVIES_PER_PAGE },
      },
    ],
  });

  const toggleWatched = useCallback(
    async (favMovieID: number): Promise<boolean> => {
      try {
        const { data } = await toggleWatchedStatus({
          variables: { favMovieID },
        });
        if (!data?.toggleWatchedStatus.watchedStatus) {
          return false;
        }
        return data.toggleWatchedStatus.watchedStatus;
      } catch {
        return false;
      }
    },
    [toggleWatchedStatus]
  );
  return toggleWatched;
}
