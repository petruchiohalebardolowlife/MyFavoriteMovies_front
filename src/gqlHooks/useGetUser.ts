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

import { useQuery } from "@apollo/client";

const useGetUser = () => {
  const {
    data: { getUser: currentUser } = {},
    loading: isLoadingGetUser,
    error: errorGetUser,
    refetch: refetchGetUser,
  } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  return {
    currentUser,
    isLoadingGetUser,
    errorGetUser,
    refetchGetUser,
  };
};

export default useGetUser;
