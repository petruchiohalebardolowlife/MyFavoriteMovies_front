import { Route, Routes } from "react-router-dom";
import SignInPage from "@pages/SignInPage";
import "./App.css";
import MainPage from "@pages/MainPage";
import { withAuth } from "@middlewares/withAuth";
import Header from "@components/Header";
import SearchMoviesPage from "@pages/SearchMoviesPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={withAuth(MainPage)({})} />
        {/* <Route path="/searchmovies" element={withAuth(SearchMoviesPage)({})} /> */}
      </Routes>
    </>
  );
}

export default App;
