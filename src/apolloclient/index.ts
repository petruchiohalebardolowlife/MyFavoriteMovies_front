import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  fromPromise,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKENS } from "@gqlHooks/useRefreshTokens";

const httpLink = createHttpLink({
  uri: "http://localhost:8081/query",
  credentials: "include",
});

// const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
//   if (graphQLErrors) {
//     return new Observable(observer => {
//       (async () => {
//         for (const err of graphQLErrors) {
//           console.log("errorExtensionCode", err.extensions?.code);
          
//           if (err.extensions?.code === "400") {
//             localStorage.removeItem("token");
//             try {
//               const accessToken = await getRefreshToken();
//               if (accessToken) {
//                 const oldHeaders = operation.getContext().headers;
//                 operation.setContext({
//                   headers: {
//                     ...oldHeaders,
//                     Authorization: accessToken,
//                   },
//                 });
//                 forward(operation).subscribe({
//                   next: observer.next.bind(observer),
//                   error: observer.error.bind(observer),
//                   complete: observer.complete.bind(observer),
//                 });
//                 return;
//               }
//             } catch (error) {
//               console.log("error in getRefreshToken in errorLink", error);
//               observer.error(error);
//             }
//           }
//         }
//         observer.complete();
//       })();
//     });
//   }

//   if (networkError) {
//     console.log("I am a network error", networkError);
//   }

//   return forward(operation);
// });

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.log("errorExtentionCode", err.extensions?.code);
        switch (err.extensions?.code) {
          case "401":
            localStorage.removeItem("token");
            return fromPromise(
              getRefreshToken().catch((error) => {
                console.log("error in getRefreshToken in errorLink", error);

                return;
              })
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    Authorization: accessToken,
                  },
                });
                //retry the request, returning the new observable
                console.log("here the error");
                return forward(operation);
              });
        }
      }
    }
    if (networkError) {
      console.log("I am a network error", networkError);
    }
  }
);

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
  // link: from([errorLink, authLink.concat(httpLink)]),
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const getRefreshToken = async () => {
//   return client.query({ query: REFRESH_TOKENS }).then((response) => {
//     const { accessToken } = response.data.queryRefreshToken;
//     console.log("accessToken", accessToken);
//     return accessToken;
//   });
// };

const getRefreshToken = async () => {
  try {
    localStorage.removeItem("token");
    const { data } = await client.query({ query: REFRESH_TOKENS });
    if (data && data.queryRefreshToken) {
      localStorage.setItem("token", data.queryRefreshToken);
    }
    return data.queryRefreshToken;
  } catch (error) {
    console.log("BLYAT", error);
    return error;
  }
};

// const getRefreshToken = () => {
//   return client
//     .query({ query: REFRESH_TOKENS })
//     .then((response) => {
//       const { accessToken } = response.data?.queryRefreshToken || {};
//       if (!accessToken) throw new Error("No accessToken received");
//       console.log("accessToken", accessToken);
//       return accessToken;
//     })
//     .catch((error) => {
//       console.error("Error in getRefreshToken:", error);
//       return null;
//     });
// };

export default client;

// const getRefreshToken = async () => {
//   try {
//     const [, { data: { refreshToken: token } = {} }] =
//       useMutation(REFRESH_TOKENS);
//     console.log("BEFORE IF", token);
//     if (!token) {
//       console.log("IN IF", token);
//       return false;
//     }
//     console.log("AFTER IF", token);
//     return token;
//   } catch {
//     return false;
//   }
// };
