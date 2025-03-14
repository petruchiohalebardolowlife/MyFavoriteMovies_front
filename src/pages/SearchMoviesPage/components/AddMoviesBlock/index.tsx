import { useEffect, useState } from "react";
import Select from "react-select";
import getYears from "@utils/getYears";
import { Genre, useFetchMovies } from "@services/tmdbQuery";
import { useLingui } from "@lingui/react/macro";
import Pagination from "@components/Pagination";
import { START_PAGE } from "@components/constants";
import GenresBlock from "@components/GenresBlock";
import MovieCard from "@components/MovieCard";
import Button from "@components/Button";
import { ViewModeType } from "types";
import { GRID_VIEW } from "@components/constants";

interface AddMoviesBlockProps {
  genres: Genre[];
  viewMode: ViewModeType;
}

interface SelectOption {
  value: number;
  label: string;
}

function AddMoviesBlock({ genres, viewMode }: AddMoviesBlockProps) {
  const [rating, setRating] = useState(0);
  const [currentPage, setPage] = useState(START_PAGE);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null
  );
  const { t } = useLingui();
  const years = getYears();
  const [selected, setSelected] = useState<number[]>([]);

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

  const {
    isPending,
    error,
    data: response,
  } = useFetchMovies({
    page: currentPage,
    primaryReleaseYear: selectedOption?.value,
    voteAverageGte: rating,
    withGenres: selected,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <GenresBlock
        onClick={toggleGenreForFilter}
        genres={genres}
        selected={selected}
      />

      {/* Блок фильтров (РЕЙТИНГ) */}
      <div className="flex flex-row text-lg">
        <span className="px-4">{t`Rating`}</span>
        <input
          id="rating"
          value={rating}
          step={0.1}
          type="range"
          min={0}
          max={10}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <div className="w-16 text-center">
          <span>{rating}</span>
        </div>
      </div>

      {/* Блок фильтров (ГОД) */}
      <div className="flex flex-row text-lg">
        <span className="px-4">{t`Primary release year`}</span>
        <Select
          className="w-32"
          options={years}
          placeholder={t`Choose year`}
          value={selectedOption}
          onChange={(selectedOption) => setSelectedOption(selectedOption)}
        />
      </div>

      {/* СПИСОК ФИЛЬМОВ */}

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
          response?.results.map((movie) => (
            <MovieCard
              movie={movie}
              genres={genres}
              viewMode={viewMode}
              number={response.results.indexOf(movie) + 1 + "."}
              buttons={
                <Button onClick={() => {}} children={<span>CLICK ME</span>} />
              }
            />
          ))
        )}
      </div>

      <></>

      {/* ПАГИНАЦИЯ */}
      <Pagination
        currentPage={currentPage}
        totalPages={response?.totalPages || START_PAGE}
        setPage={setPage}
      />
    </div>
  );
}

export default AddMoviesBlock;
