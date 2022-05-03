import { gql } from "graphql-request";

export const queryTimeOverview = gql`
  query TimeOverview($from: Float!, $to: Float!) {
    getTimeframeOverview(from: $from, to: $to) {
      from
      to
      tasksCompleted
      totalTimeInSeconds
      tasksWithinTimeframe {
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

export const queryProjectOverview = gql`
  query ProjectOverview($projectId: String!, $from: Float!, $to: Float!) {
    getProjectOverview(projectId: $projectId, from: $from, to: $to) {
      from
      to
      tasksCompleted
      totalTimeInSeconds
      tasksWithinTimeframe {
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
