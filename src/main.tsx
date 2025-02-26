import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { dynamicActivate } from "../locales/i18n";
import App from "./App.tsx";

function Root() {
  const [locale, setLocale] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "en");
    }
  }, []);

  useEffect(() => {
    const activateLanguage = async () => {
      await dynamicActivate(locale);
    };
    activateLanguage();
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      <BrowserRouter>
        <App setLocale={setLocale} />
      </BrowserRouter>
    </I18nProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
