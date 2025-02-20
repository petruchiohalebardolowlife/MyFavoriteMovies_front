// App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInForm from "./pages/SignInPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInForm />} />
      </Routes>
    </Router>
  );
};

export default App;
