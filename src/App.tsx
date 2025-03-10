import { Route, Routes } from "react-router-dom";
import SignInPage from "@pages/SignInPage";
import "./App.css";
import MainPage from "@pages/MainPage";
import { withAuth } from "@middlewares/withAuth";
import Header from "@components/Header";
import SearchMoviesPage from "@pages/SearchMoviesPage";
import { useState } from "react";

function App() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  return (
    <>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/"
          element={withAuth(MainPage)({ setViewMode, viewMode })}
        />
        <Route
          path="/searchmovies"
          element={withAuth(SearchMoviesPage)({ setViewMode, viewMode })}
        />
      </Routes>
    </>
  );
}

export default App;
