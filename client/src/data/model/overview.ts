import { Result } from "../result";
import { IProject } from "./project";
import { Timestamp } from "./types/timestamp";

export interface IOverview {
  from: Timestamp;
  to: Timestamp;
  tasksCompleted: number;
  totalTimeInSeconds: number;
}

export interface IOverviewProvider {
  daily: Result<IOverview>;
  weekly: Result<IOverview>;
  recents: Result<IProject[]>;

  refresh: () => void;
}
