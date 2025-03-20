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
