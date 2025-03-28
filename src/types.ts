export type ViewModeType = "list" | "grid";

export interface FavoriteMovie {
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
  vote_average: number;
}

export interface Movie {
  movieID: number;
  title: string;
  posterPath: string;
  genreIDs: number[];
  releaseDate: string;
  voteAverage: number;
}

export interface Genre {
  id: number;
  name: string;
}
