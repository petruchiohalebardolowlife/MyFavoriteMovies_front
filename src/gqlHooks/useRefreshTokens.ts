import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const REFRESH_TOKENS = gql`
  mutation {
    newAccessToken
  }
`;

export function useRefreshTokens() {
  const [refreshToken] = useMutation(REFRESH_TOKENS);
  return refreshToken;
}

export default useRefreshTokens;
