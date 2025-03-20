// import { useQuery } from "@apollo/client";
// import { User } from "./useSignIn";
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

// interface GetUserResponse {
//   getUser: {
//     id: string;
//     nickName: string;
//     userName: string;
//   };
// }

// export function useGetUser() {
//   const { data, loading, error } = useQuery<GetUserResponse>(GET_USER, {
//     fetchPolicy: "network-only",
//     notifyOnNetworkStatusChange: true,
//   });
//   return {
//     currentUser: {
//       id: data?.getUser.id,
//       nickName: data?.getUser.nickName,
//       userName: data?.getUser.userName,
//     } as User,
//     loading,
//     error,
//   };
// }

import { useQuery } from "@apollo/client";

const useGetUser = () => {
  const {
    data: dataGetUser,
    loading: isLoadingGetUser,
    error: errorGetUser,
    refetch: refetchGetUser,
  } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  return {
    dataGetUser,
    isLoadingGetUser,
    errorGetUser,
    refetchGetUser,
  };
};

export default useGetUser;
