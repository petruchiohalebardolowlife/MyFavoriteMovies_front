import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { fromPromise } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "@components/constants";
import { REFRESH_TOKENS } from "@gqlHooks/useRefreshTokens";

const httpLink = createHttpLink({
  uri: API_URL,
  credentials: "include",
});

const refreshClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const getNewTokens = async () => {
  try {
    const { data } = await refreshClient.mutate({ mutation: REFRESH_TOKENS });
    localStorage.removeItem("token");
    if (!data?.newAccessToken) {
      throw new Error("No token in data");
    }
    localStorage.setItem("token", data.newAccessToken);
    return data.newAccessToken;
  } catch {
    return null;
  }
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions?.code) {
        case "401":
          return fromPromise(
            getNewTokens().catch(() => {
              return null;
            })
          )
            .filter((value) => Boolean(value))
            .flatMap((accessToken) => {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: accessToken,
                },
              });

              return forward(operation);
            });
      }
    }
  }
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
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;
