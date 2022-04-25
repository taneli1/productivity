import { gql } from "graphql-request";

export const queryLogin = gql`
  query QueryLogin($credentials: UserCredentials!) {
    login(credentials: $credentials) {
      token
      username
    }
  }
`;
