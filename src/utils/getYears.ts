import { LAST_EIGHTY_YEARS } from "@components/constants";

function getYears() {
  const listOfYears = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear; i >= currentYear - LAST_EIGHTY_YEARS; i--) {
    listOfYears.push({ value: i, label: i.toString() });
  }

  return listOfYears;
}

export default getYears;
