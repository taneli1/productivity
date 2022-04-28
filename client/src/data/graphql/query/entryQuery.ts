import { gql } from "graphql-request";

export const querySaveEntry = gql`
  mutation SaveEntry($data: NewEntryInput!) {
    createEntry(data: $data) {
      _id
      userId
      taskId
      createdAt
      timeInSeconds
    }
  }
`;
