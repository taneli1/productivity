import { Timestamp } from "./types/timestamp";

export interface IOverview {
  from: Timestamp;
  to: Timestamp;
  tasksCompleted: number;
  totalTimeInSeconds: number;
}
