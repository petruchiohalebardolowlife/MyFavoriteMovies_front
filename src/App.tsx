import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInForm from "./pages/SignInPage";
import "./App.css";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
