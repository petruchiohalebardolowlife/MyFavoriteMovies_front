import { LIST_VIEW } from "@components/constants";
import ViewButton from "@components/ViewButton";
import { useLingui } from "@lingui/react/macro";
import { useState } from "react";
import { ViewModeType } from "types";
import AddMoviesBlock from "./components/AddMoviesBlock";
import { useFetchGenres } from "@services/tmdbQuery";

function SearchMoviesPage() {
  const [viewMode, setViewMode] = useState<ViewModeType>(LIST_VIEW);
  const { t } = useLingui();
  const { isPending, error, data: genres } = useFetchGenres();

  if (isPending) return <div>{t`Loading...`}</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1 className="text-center text-xl">{t`Search Movies Page`}</h1>
      <div className="flex flex-row-reverse">
        <ViewButton viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <AddMoviesBlock genres={genres} viewMode={viewMode}></AddMoviesBlock>
    </>
  );
}

export default SearchMoviesPage;
