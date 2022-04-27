import { gql } from "graphql-request";

export const queryCreateTask = gql`
  mutation CreateTask($data: NewTaskInput!) {
    createTask(data: $data) {
      _id
      name
      state
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
      labels {
        name
        hex
      }
    }
  }
`;
