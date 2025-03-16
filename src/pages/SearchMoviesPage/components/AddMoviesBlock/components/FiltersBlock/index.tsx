import { useLingui } from "@lingui/react/macro";
import Select from "react-select";
import { SelectOption } from "../..";
import getYears from "@utils/getYears";
import { useMemo } from "react";
import {
  INPUT_STEP,
  MAX_VALUE_RANGE,
  MIN_VALUE_RANGE,
} from "@components/constants";

interface InputFilterProps {
  rating: number;
  setRating: (value: number) => void;
  selectedOption: SelectOption | null;
  setSelectedOption: (selectedOption: SelectOption | null) => void;
}

function FiltersBlock({
  rating,
  setRating,
  selectedOption,
  setSelectedOption,
}: InputFilterProps) {
  const { t } = useLingui();
  const years = useMemo(() => getYears(), []);

  return (
    <>
      <div className="flex flex-row text-lg">
        <span className="px-4">{t`Rating`}</span>
        <input
          id="rating"
          value={rating}
          step={INPUT_STEP}
          type="range"
          min={MIN_VALUE_RANGE}
          max={MAX_VALUE_RANGE}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <div className="w-16 text-center">
          <span>{rating}</span>
        </div>
      </div>
      <div className="flex flex-row items-center text-lg">
        <span className="px-4 justify-center">{t`Primary release year`}</span>
        <Select
          className="w-60 my-2"
          options={years}
          placeholder={t`Select year`}
          value={selectedOption}
          onChange={(selectedOption) => setSelectedOption(selectedOption)}
        />
      </div>
    </>
  );
}

export default FiltersBlock;
