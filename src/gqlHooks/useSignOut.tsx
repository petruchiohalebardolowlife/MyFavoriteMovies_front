import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const SIGN_OUT = gql`
  mutation {
    logOut
  }
`;

export function useSignOut() {
  const [signOut] = useMutation(SIGN_OUT);
  return signOut;
}
