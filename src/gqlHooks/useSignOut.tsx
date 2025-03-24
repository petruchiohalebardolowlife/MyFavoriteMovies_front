import { gql } from "@apollo/client";
import { useMutation, useApolloClient } from "@apollo/client";
import { User } from "./useSignIn";

const SIGN_OUT = gql`
  mutation {
    logOut
  }
`;

export function useSignOut(
  setUser: React.Dispatch<React.SetStateAction<User | null>>
) {
  const [signOut] = useMutation(SIGN_OUT);
  const client = useApolloClient();
  const logout = async (): Promise<boolean> => {
    try {
      const { data } = await signOut();
      if (data?.logOut) {
        localStorage.removeItem("token");
        setUser(null);
        client.resetStore();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  return logout;
}
