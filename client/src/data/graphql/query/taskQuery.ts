import { gql } from "graphql-request";

export const queryCreateTask = gql`
  mutation CreateTask($data: NewTaskInput!) {
    createTask(data: $data) {
      _id
      name
      state
      projectId
      completionTs
      labels {
        name
        hex
      }
    }
  }
`;

export const queryEditTask = gql`
  mutation EditTask($data: EditTaskInput!) {
    editTask(data: $data) {
      _id
      name
      state
      completionTs
      projectId
      labels {
        name
        hex
      }
    }
  }
`;

export const queryDeleteTask = gql`
  mutation DeleteTask($id: String!, $projectId: String!) {
    deleteTask(id: $id, projectId: $projectId) {
      _id
      name
      projectId
      completionTs
      state
      labels {
        name
        hex
      }
    }
  }
`;
