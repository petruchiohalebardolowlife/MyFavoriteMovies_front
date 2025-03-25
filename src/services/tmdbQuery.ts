import { useQuery } from "@tanstack/react-query";
import { useLocale } from "@contexts/localeContext";
import { MovieResponse } from "types";
import { convertAPIResponse } from "@utils/formatAPIData";
import { API_KEY, API_TMDB_URL, START_PAGE } from "@components/constants";

export interface Genre {
  id: number;
  name: string;
}

export interface APIResponse {
  page: number;
  results: MovieResponse[];
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
        `${API_TMDB_URL}/genre/movie/list?api_key=${API_KEY}&language=${language}`
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
  const { data, isPending, error } = useQuery<APIResponse>({
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
        `${API_TMDB_URL}/discover/movie?${params}&language=${language}`
      );
      if (!response.ok) {
        console.error("Error fetching movies");
      }
      return response.json();
    },
  });
  const convertedData = data
    ? convertAPIResponse(data)
    : { results: [], totalPages: START_PAGE };
  const movies = convertedData.results;
  const totalPages = convertedData.totalPages;

  return {
    movies,
    totalPages,
    isPending,
    error,
  };
};
