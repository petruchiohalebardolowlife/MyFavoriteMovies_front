import { useQuery } from "@tanstack/react-query";
import { useLocale } from "@contexts/localeContext";

export interface Genre {
  id: number;
  name: string;
}
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
}

interface FilteredMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

interface GenreResponse {
  genres: Genre[];
}

interface FilterParams {
  page?: number;
  withGenres?: number[];
  primaryReleaseYear?: number;
  voteAverageGte?: number;
}

const API_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const getLanguageFromLocale = (locale: string) => {
  return locale === "en" ? "en-US" : "ru-RU";
};

export const useFetchGenres = () => {
  const { locale } = useLocale();
  const language = getLanguageFromLocale(locale);
  return useQuery<Genre[]>({
    queryKey: ["genres", locale],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/genre/movie/list?api_key=${API_KEY}&language=${language}`
      );
      if (!response.ok) {
        throw console.error("Error fetching genres");
      }

      const data: GenreResponse = await response.json();
      return data.genres;
    },
  });
};

export const useFetchMovies = (filters: FilterParams) => {
  const { locale } = useLocale();
  const language = getLanguageFromLocale(locale);
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
      const response = await fetch(
        `${API_URL}/discover/movie?${params}&language=${language}`
      );
      if (!response.ok) {
        console.error("Error fetching movies");
      }
      const data: FilteredMoviesResponse = await response.json();
      return data;
    },
  });
};
