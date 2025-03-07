import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { LocaleProvider } from "@contexts/localeContext.tsx";
import { QueryProvider } from "@contexts/queryContext.tsx";
import { AuthProvider } from "@contexts/authContext.tsx";

function Root() {
  return (
    <QueryProvider>
      <LocaleProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </LocaleProvider>
    </QueryProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
