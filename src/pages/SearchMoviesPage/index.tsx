import ViewButton from "@components/ViewButton";

interface SearchMoviesPageProps {
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
}

function SearchMoviesPage({ viewMode, setViewMode }: SearchMoviesPageProps) {
  return (
    <>
      <div>Search Movies Page</div>
      <ViewButton viewMode={viewMode} setViewMode={setViewMode}></ViewButton>
    </>
  );
}

export default SearchMoviesPage;
