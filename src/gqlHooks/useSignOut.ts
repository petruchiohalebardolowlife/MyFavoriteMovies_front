import { gql } from "@apollo/client";
import { useMutation, useApolloClient } from "@apollo/client";

const SIGN_OUT = gql`
  mutation {
    logOut
  }
`;

export function useSignOut() {
  const [signOut] = useMutation(SIGN_OUT);
  const client = useApolloClient();
  const logout = async (): Promise<boolean> => {
    try {
      const { data } = await signOut();
      if (data?.logOut) {
        localStorage.removeItem("token");
        client.resetStore();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return logout;
}
