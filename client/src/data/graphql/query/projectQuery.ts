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
        _id
        completionTs
        projectId
        name
        state
        labels {
          name
          hex
        }
        entries {
          _id
          createdAt
          timeInSeconds
        }
      }
    }
  }
`;

export const queryRecentProjects = gql`
  query GetRecentProjects($limit: Float!) {
    getRecents(limit: $limit) {
      _id
      name
      hex
      state
      creationDate
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

export const queryEditProject = gql`
  mutation EditProject($data: EditProjectInput!) {
    editProject(data: $data) {
      _id
      name
      hex
      state
      creationDate
    }
  }
`;

export const queryDeleteProject = gql`
  mutation DeleteProject($id: String!) {
    deleteProject(id: $id) {
      _id
      name
      hex
      state
      creationDate
    }
  }
`;
