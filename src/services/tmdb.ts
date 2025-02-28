import axios from "axios";

interface Genre {
  id: number;
  name: string;
}
interface Movie {
  id: number;
  title: string;
  posterPath: string;
  genreIDs: number[];
  releaseDate: string;
}

interface FilteredMoviesResponse {
  page: number;
  results: Movie[];
}

interface FilterParams {
  page?: number;
  withGenres?: string[];
  primaryReleaseYear?: number;
  voteAverageGte?: number;
}

export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get<{ genres: Genre[] }>(
      `${import.meta.env.VITE_BASE_URL}/genre/movie/list`,
      {
        params: { api_key: import.meta.env.VITE_API_KEY },
      }
    );
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const fetchFilteredMovies = async (
  filterParams: FilterParams
): Promise<Partial<FilteredMoviesResponse>> => {
  try {
    const response = await axios.get<FilteredMoviesResponse>(
      `${import.meta.env.VITE_BASE_URL}/discover/movie`,
      {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          page: filterParams.page,
          with_genres: filterParams.withGenres?.join(","),
          "vote_average.gte": filterParams.voteAverageGte,
          primary_release_year: filterParams.primaryReleaseYear,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching films:", error);
    return {};
  }
};
