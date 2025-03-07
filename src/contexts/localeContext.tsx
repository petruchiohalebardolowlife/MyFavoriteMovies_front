import { dynamicActivate } from "../../locales/i18n";
import { ReactNode } from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}
interface LocaleProviderProps {
  children: ReactNode;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocale] = useState(
    localStorage.getItem("language") || "en"
  );
  useEffect(() => {
    const activateLanguage = async () => {
      await dynamicActivate(locale);
    };
    activateLanguage();
    localStorage.setItem("language", locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale() may be used only with LocaleProvider");
  }
  return context;
}
