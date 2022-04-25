import { gql } from "graphql-request";

export const queryProjectList = gql`
  query {
    projects {
      _id
      name
      state
      hex
      tasks {
        name
      }
    }
  }
`;
