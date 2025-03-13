import { OFFSET_PAGE } from "@components/constants";

export function getListOfPages(currentPage: number, totalPages: number) {
  const listOfPages = [];
  const firstPageInList = Math.max(1, currentPage - OFFSET_PAGE);
  const lastPageInList = Math.min(totalPages, currentPage + OFFSET_PAGE);
  for (let i = firstPageInList; i <= lastPageInList; i++) {
    listOfPages.push(i);
  }
  return listOfPages;
}

export default getListOfPages;
