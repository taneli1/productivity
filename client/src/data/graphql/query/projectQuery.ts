import { gql } from "graphql-request";

export const queryProjectList = gql`
  query {
    projects {
      _id
      name
      hex
      state
      creationDate
    }
  }
`;

export const queryProjectData = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      _id
      name
      state
      hex
      tasks {
        name
        state
        labels {
          name
          hex
        }
      }
    }
  }
`;

export const queryCreateProject = gql`
  mutation NewProject($data: NewProjectInput!) {
    createProject(data: $data) {
      _id
      name
      hex
      state
      creationDate
    }
  }
`;
