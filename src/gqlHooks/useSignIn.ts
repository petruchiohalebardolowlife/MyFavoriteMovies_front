import { useMutation, gql } from "@apollo/client";
import useGetUser from "./useGetUser";

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

interface LoginParams {
  username: string;
  password: string;
}

export interface User {
  id: string;
  nickName: string;
}

export function useSignIn() {
  const [signIn] = useMutation(SIGN_IN);
  const { refetch } = useGetUser(!localStorage.getItem("token"));

  const login = async ({
    username,
    password,
  }: LoginParams): Promise<boolean> => {
    try {
      const { data } = await signIn({
        variables: { username, password },
      });
      const token = data?.signIn?.token;
      if (!token) {
        return false;
      }
      localStorage.setItem("token", token);
      await refetch();
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  return login;
}
