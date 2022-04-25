import { gql } from "graphql-request";

export const queryLogin = gql`
  query QueryLogin($credentials: UserCredentials!) {
    login(credentials: $credentials) {
      token
      username
    }
  }
`;

export const queryRegister = gql`
  mutation QueryRegister($credentials: UserCredentials!) {
    registerUser(credentials: $credentials) {
      username
    }
  }
`;
