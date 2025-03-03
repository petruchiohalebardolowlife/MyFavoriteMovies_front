import { useQuery } from "@tanstack/react-query";

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

interface GenreResponse {
  genres: Genre[];
}

interface FilterParams {
  page?: number;
  withGenres?: string[];
  primaryReleaseYear?: number;
  voteAverageGte?: number;
}

const API_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const useFetchGenres = () => {
  return useQuery<GenreResponse>({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw console.error("Error fetching genres");
      }
      return response.json();
    },
  });
};

export const useFetchMovies = (filters: FilterParams) => {
  return useQuery<FilteredMoviesResponse>({
    queryKey: ["movies", filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        api_key: API_KEY,
      });
      if (filters.page) {
        params.append("page", filters.page.toString());
      }
      if (filters.withGenres && filters.withGenres.length > 0) {
        params.append("with_genres", filters.withGenres.join(","));
      }
      if (filters.primaryReleaseYear) {
        params.append(
          "primary_release_year",
          filters.primaryReleaseYear.toString()
        );
      }
      if (filters.voteAverageGte) {
        params.append("vote_average.gte", filters.voteAverageGte.toString());
      }
      const response = await fetch(`${API_URL}/discover/movie?${params}`);
      if (!response.ok) {
        console.error("Error fetching movies");
      }
      return response.json();
    },
  });
};
