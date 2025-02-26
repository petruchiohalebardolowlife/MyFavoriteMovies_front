import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInForm from "./pages/SignInPage";
import "./App.css";
import MainPage from "./pages/MainPage";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { useEffect, useState } from "react";
import { dynamicActivate } from "../locales/i18n";
import Header from "./components/Header";
import { withAuth } from "./middlewares/withAuth";

function App() {
  const [locale, setLocale] = useState(localStorage.getItem("language"));
  if (!locale) {
    localStorage.setItem("language", "en")
    setLocale(localStorage.getItem("language"))
  }

  useEffect(() => {
    const activateLanguage = async () => {
      await dynamicActivate(locale || "en");
    };
    activateLanguage();
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      <Router>
        <Header changeLanguage={setLocale} />
        <Routes>
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/" element={withAuth(MainPage)({})} />
        </Routes>
      </Router>
    </I18nProvider>
  );
}

export default App;
