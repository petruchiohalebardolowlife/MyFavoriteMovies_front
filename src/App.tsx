import { Route, Routes } from "react-router-dom";
import SignInForm from "./pages/SignInPage/SignInPage";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import { withAuth } from "./middlewares/withAuth";
import Header from "./components/Header";
import SearchMovies from "./pages/SearchMovies/SearchMovies";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/" element={withAuth(MainPage)({})} />
        <Route path="/searchmovies" element={withAuth(SearchMovies)({})} />
      </Routes>
    </>
  );
}

export default App;
