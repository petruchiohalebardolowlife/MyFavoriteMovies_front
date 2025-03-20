import { useQuery } from "@apollo/client";
import { User } from "./useSignIn";
import { gql } from "@apollo/client";

const GET_USER = gql`
  query {
    getUser {
      id
      nickName
      userName
    }
  }
`;

interface GetUserResponse {
  getUser: {
    id: string;
    nickName: string;
    userName: string;
  };
}

export function useGetUser() {
  const { data, loading, error, refetch } = useQuery<GetUserResponse>(GET_USER);
  return {
    currentUser: {
      id: data?.getUser.id,
      nickName: data?.getUser.nickName,
      userName: data?.getUser.userName,
    } as User,
    loading,
    error,
    refetchGetUser: refetch,
  };
}
