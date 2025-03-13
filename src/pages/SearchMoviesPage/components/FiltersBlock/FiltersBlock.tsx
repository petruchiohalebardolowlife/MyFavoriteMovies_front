import { useEffect, useState } from "react";
import Select from "react-select";
import getYears from "@utils/getYears";
import { Genre, useFetchMovies } from "@services/tmdbQuery";
import { useLingui } from "@lingui/react/macro";
import { API_PICS } from "@components/constants";
import Pagination from "@components/Pagination";
import { START_PAGE } from "@components/constants";
import GenresBlock from "@components/GenresBlock";

interface FilterParams {
  page?: number;
  withGenres?: number[];
  primaryReleaseYear?: number;
  voteAverageGte?: number;
  genres: Genre[];
}

interface SelectOption {
  value: number;
  label: string;
}

function FiltersBlock({
  page,
  withGenres,
  primaryReleaseYear,
  voteAverageGte,
  genres,
}: FilterParams) {
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

  const toggleGenreForFilter = (id: number) => {
    setSelected((prevState) =>
      prevState.includes(id)
        ? prevState.filter((value) => value !== id)
        : [...prevState, id]
    );
  };

  const { isPending, error, data } = useFetchMovies({
    page: currentPage,
    primaryReleaseYear: 2024,
    voteAverageGte: 7,
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
      <div className="flex flex-row">
        {isPending ? (
          <span>{t`Loading...`}</span>
        ) : (
          data?.results.map((movie) => (
            <div key={movie.id}>
              <img src={API_PICS + movie.poster_path} alt={movie.title} />
            </div>
          ))
        )}
      </div>

      {/* ПАГИНАЦИЯ */}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.total_pages || 1}
        setPage={setPage}
      />
    </div>
  );
}

export default FiltersBlock;
