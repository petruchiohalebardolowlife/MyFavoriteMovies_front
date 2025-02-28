import { StrictMode} from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { LocaleProvider } from "./localeContext.tsx";

function Root() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocaleProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
