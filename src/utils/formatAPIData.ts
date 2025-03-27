import { APIResponse } from "@services/tmdbQuery";
import { Movie, MovieResponse } from "types";

export interface FormatResponse {
  page: number;
  results: Movie[];
  totalPages: number;
}

function convertMovieResponse(movie: MovieResponse): Movie {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    genreIDs: movie.genre_ids,
    voteAverage: movie.vote_average,
    releaseDate: movie.release_date,
  };
}

export function convertAPIResponse(response: APIResponse): FormatResponse {
  return {
    page: response.page,
    results: response.results.map(convertMovieResponse),
    totalPages: response.total_pages,
  };
}
