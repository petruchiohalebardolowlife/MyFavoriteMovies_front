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
    fetchPolicy: "cache-and-network",
  });

  const user = data?.getUser || null;

  return {
    user,
    loading,
    error,
    refetch,
  };
};

export default useGetUser;
