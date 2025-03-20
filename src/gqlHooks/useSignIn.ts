import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(SignInInput: { username: $username, password: $password }) {
      user {
        id
        userName
        nickName
      }
      token
    }
  }
`;

export interface User {
  id: string;
  userName: string;
  nickName: string;
}

interface SignInResponse {
  signIn: {
    user: User;
    token: string;
  };
}

export function useSignIn() {
  const [signInMutation, { data, loading, error }] =
    useMutation<SignInResponse>(SIGN_IN);

  return {
    signIn: signInMutation,
    newUser: data?.signIn.user,
    token: data?.signIn.token,
    loading,
    error,
  };
}

