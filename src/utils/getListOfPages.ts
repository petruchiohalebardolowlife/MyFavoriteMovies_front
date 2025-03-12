export function getListOfPages(currentPage: number, totalPages: number) {
  const listOfPages = [];
  const firstPageInList = Math.max(1, currentPage - 5);
  const lastPageInList = Math.min(totalPages, currentPage + 5);
  for (let i = firstPageInList; i <= lastPageInList; i++) {
    listOfPages.push(i);
  }
  return listOfPages;
}

export default getListOfPages;
