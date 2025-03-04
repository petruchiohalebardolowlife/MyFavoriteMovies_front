import { Route, Routes } from "react-router-dom";
import SignInForm from "./pages/SignInPage";
import "./App.css";
import MainPage from "./pages/MainPage";
import { withAuth } from "./middlewares/withAuth";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/" element={withAuth(MainPage)({})} />
      </Routes>
    </>
  );
}

export default App;
