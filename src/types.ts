export type ViewModeType = "list" | "grid";

export interface FavoriteMovie {
  // id: number;
  movieID: number;
  title: string;
  posterPath: string;
  genreIDs: number[];
  releaseDate: string;
  watchedStatus: boolean;
}

export interface MovieResponse {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
}

export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  genreIDs: number[];
  releaseDate: string;
}
