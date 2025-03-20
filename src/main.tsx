import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { LocaleProvider } from "@contexts/localeContext.tsx";
import { QueryProvider } from "@contexts/queryContext.tsx";
import { AuthProvider } from "@contexts/authContext.tsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

//DELETE AFTER THIS SHIT

const httpLink = createHttpLink({
  uri: "http://localhost:8081/query",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      Authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function Root() {
  return (
    <ApolloProvider client={client}>
      <QueryProvider>
        <LocaleProvider>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </LocaleProvider>
      </QueryProvider>
    </ApolloProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
