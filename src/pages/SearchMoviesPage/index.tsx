import { LIST_VIEW } from "@components/constants";
import ViewButton from "@components/ViewButton";
import { useLingui } from "@lingui/react/macro";
import { useState } from "react";
import { ViewModeType } from "types";

function SearchMoviesPage() {
  const [viewMode, setViewMode] = useState<ViewModeType>(LIST_VIEW);
  const { t } = useLingui();
  return (
    <>
      <h1>{t`Search Movies Page`}</h1>
      <ViewButton viewMode={viewMode} setViewMode={setViewMode} />
    </>
  );
}

export default SearchMoviesPage;
