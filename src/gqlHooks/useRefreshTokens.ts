import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const REFRESH_TOKENS = gql`
  mutation {
    refreshToken
  }
`;

export function useRefreshToken() {
  const [refreshToken] = useMutation(REFRESH_TOKENS);
  return refreshToken;
}

export default useRefreshToken;
