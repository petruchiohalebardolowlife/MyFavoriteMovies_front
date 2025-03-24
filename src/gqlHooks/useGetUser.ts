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
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    skip,
    fetchPolicy: "network-only",
  });

  const currentUser = data?.getUser || null;

  return {
    currentUser,
    loading,
    error,
    refetch,
  };
};

export default useGetUser;
