import axios from "axios";

interface Genre {
  ID: number;
  Name: string;
}
interface Movie {
  ID: number;
  Title: string;
  PosterPath: string;
  GenreIDs: number[];
  ReleaseDate: string
}

interface FilteredMoviesResponse {
  page: number;
  results: Movie[]
}

interface FilterParams {
  page?: number;
  with_genres?: string[];
  primary_release_year?: number;
  "vote_average.gte"?: number;
}

export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get<{ genres: Genre[] }>(
      `${import.meta.env.VITE_API_URL}/genre/movie/list`,
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
): Promise<Movie[]> => {
  const params = {
    api_key: import.meta.env.VITE_API_KEY,
    ...filterParams,
    with_genres: filterParams.with_genres?.length
      ? filterParams.with_genres.join(",")
      : undefined,
  };
  try {
    const response = await axios.get<FilteredMoviesResponse>(
      `${import.meta.env.VITE_API_URL}/discover/movie`,
      { params }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching films:", error);
    return [];
  }
};
