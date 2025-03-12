import Button from "./Button";
import getListOfPages from "@utils/getListOfPages";
import { ICON_SIZE, START_PAGE } from "./constants";
import { Ellipsis } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: (currentPage: number) => void;
}

function Pagination({ totalPages, currentPage, setPage }: PaginationProps) {
  const listOfPages = getListOfPages(currentPage, totalPages);
  return (
    <div className="flex flex-row justify-center my-4">
      {!listOfPages.includes(START_PAGE) ? (
        <>
          <Button
            isActive={currentPage === START_PAGE}
            onClick={() => setPage(START_PAGE)}
          >
            {START_PAGE}
          </Button>
          {!(Math.min(...listOfPages) - 1 === START_PAGE) ? (
            <Ellipsis size={ICON_SIZE} />
          ) : null}
        </>
      ) : null}
      {listOfPages.map((pageNumber) => (
        <Button
          isActive={currentPage === pageNumber}
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      {!listOfPages.includes(totalPages) ? (
        <>
          {!(Math.max(...listOfPages) + 1 === totalPages) ? (
            <Ellipsis size={ICON_SIZE} />
          ) : null}
          <Button
            isActive={currentPage === totalPages}
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      ) : null}
    </div>
  );
}

export default Pagination;
