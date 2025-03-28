import { useEffect, useState } from "react";
import { Genre, useFetchMovies } from "@services/tmdbQuery";
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
  const [selected, setSelected] = useState<number[]>([]);
  const { t } = useLingui();

  useEffect(() => {
    setSelected(JSON.parse(localStorage.getItem("favoriteGenres") || "[]"));
  }, []);

  useEffect(() => {
    setPage(START_PAGE);
  }, [selectedOption, rating]);

  const toggleGenreForFilter = (id: number) => {
    setSelected((prevState) =>
      prevState.includes(id)
        ? prevState.filter((value) => value !== id)
        : [...prevState, id]
    );
  };

  const { isPending, error, movies, totalPages } = useFetchMovies({
    page: currentPage,
    primaryReleaseYear: selectedOption?.value,
    voteAverageGte: rating,
    withGenres: selected,
  });

  if (error) return <div>{t`Error: ${error.message}`}</div>;

  return (
    <div>
      <GenresBlock
        onClick={toggleGenreForFilter}
        genres={genres}
        selected={selected}
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
        {isPending ? (
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
