import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { LocaleProvider } from "@contexts/localeContext.tsx";
import { AuthProvider } from "@contexts/authContext.tsx";
import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import client from "./client";

function Root() {
  return (
    <ApolloProvider client={client}>
        <LocaleProvider>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </LocaleProvider>
    </ApolloProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
