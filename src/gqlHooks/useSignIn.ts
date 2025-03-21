import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(SignInInput: { username: $username, password: $password }) {
      user {
        id
        nickName
      }
      token
    }
  }
`;

export interface User {
  id: string;
  nickName: string;
}

export function useSignIn() {
  const [signIn] = useMutation(SIGN_IN);
  return signIn;
}
