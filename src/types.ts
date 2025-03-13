export type ViewModeType = "list" | "grid";

export interface FavoriteMovie {
  id: number;
  title: string;
  posterPath: string;
  genreIDs: number[];
  releaseDate: string;
  watchedStatus: boolean;
}
