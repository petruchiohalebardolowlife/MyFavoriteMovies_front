import getYears from "@utils/getYears";

export const ICON_SIZE = 24;
export const LIST_VIEW = "list";
export const GRID_VIEW = "grid";
export const START_PAGE = 1;
export const MOVIES_PER_PAGE = 20;
export const OFFSET_PAGE = 5;
export const API_PICS = import.meta.env.VITE_PICS_URL;
export const LAST_EIGHTY_YEARS = 80;
export const INPUT_STEP = 0.1;
export const MIN_VALUE_RANGE = 0;
export const MAX_VALUE_RANGE = 10;
export const LIST_OF_YEARS = getYears();
export const API_URL = import.meta.env.VITE_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;
