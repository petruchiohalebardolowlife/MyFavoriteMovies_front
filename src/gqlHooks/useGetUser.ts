import { gql, useQuery } from "@apollo/client";

export const GET_USER = gql`
  query {
    getUser {
      id
      nickName
    }
  }
`;

const useGetUser = (skip: boolean = false) => {
  const {
    data,
    loading: loadingGetUser,
    error: errorGetUser,
    refetch: refetchGetUser,
  } = useQuery(GET_USER, {
    skip,
    fetchPolicy: "network-only",
  });

  const currentUser = data?.getUser || null;

  return {
    currentUser,
    loadingGetUser,
    errorGetUser,
    refetchGetUser,
  };
};

export default useGetUser;
