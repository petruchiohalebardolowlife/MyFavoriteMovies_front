import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { LocaleProvider } from "./localeContext.tsx";
import { QueryProvider } from "./queryContext.tsx";
import { AuthProvider } from "./authContext.tsx";

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
