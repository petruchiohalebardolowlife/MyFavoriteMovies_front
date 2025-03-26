import { useEffect, useState } from "react";
import { Genre } from "@services/tmdbQuery";
import { useLingui } from "@lingui/react/macro";
import Pagination from "@components/Pagination";
import { START_PAGE } from "@components/constants";
import GenresBlock from "@components/GenresBlock";
import MovieCard from "@components/MovieCard";
import { Movie, ViewModeType } from "types";
import { GRID_VIEW } from "@components/constants";
import { alreadyInFavorites } from "@utils/alreadyInFavorites";
import FiltersBlock from "./components/FiltersBlock";
import Button from "@components/Button";
import useGetFavoriteGenres from "@gqlHooks/useGetFavoriteGenres";
import useGetFilteredMovies from "@gqlHooks/useGetFilteredMovies";
import { useLocale } from "@contexts/localeContext";

interface AddMoviesBlockProps {
  genres: Genre[];
  viewMode: ViewModeType;
  handleAdd: (movie: Movie) => void;
  favoriteMovies: Movie[];
}

export interface SelectOption {
  value: number;
  label: string;
}

function AddMoviesBlock({
  genres,
  viewMode,
  handleAdd,
  favoriteMovies,
}: AddMoviesBlockProps) {
  const [rating, setRating] = useState(0);
  const [currentPage, setPage] = useState(START_PAGE);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const { selected } = useGetFavoriteGenres();
  const [selectedGenres, setSelectedGenres] = useState<number[]>(selected);
  const { t } = useLingui();
  const { locale } = useLocale();

  useEffect(() => {
    setSelectedGenres(selected);
  }, [selected]);

  useEffect(() => {
    setPage(START_PAGE);
  }, [selectedOption, rating]);

  const toggleGenreForFilter = (id: number) => {
    setSelectedGenres((prevState) =>
      prevState.includes(id)
        ? prevState.filter((value) => value !== id)
        : [...prevState, id]
    );
  };

  const { movies, totalPages, loading, error } = useGetFilteredMovies(
    currentPage,
    locale,
    selectedOption?.value,
    rating,
    selectedGenres
  );
  console.log("GENRES OF MOVIE :", movies[0]?.genreIDs);
  console.log("TotalPages:", totalPages)

  if (error) return <div>{t`Error: ${error.message}`}</div>;

  return (
    <div>
      <GenresBlock
        onClick={toggleGenreForFilter}
        genres={genres}
        selected={selectedGenres}
      />
      <FiltersBlock
        rating={rating}
        setRating={setRating}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div
        className={`${
          viewMode === GRID_VIEW
            ? "grid grid-cols-4 gr gap-4"
            : "flex flex-col flex-wrap gap-6 mx-4"
        }`}
      >
        {loading ? (
          <span>{t`Loading...`}</span>
        ) : (
          movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genres={genres}
              viewMode={viewMode}
              number={index + 1 + "."}
              children={
                <Button
                  onClick={() => handleAdd(movie)}
                  isDisabled={alreadyInFavorites({
                    favoriteMovies,
                    movieid: movie.id,
                  })}
                >{t`Add`}</Button>
              }
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}

export default AddMoviesBlock;
