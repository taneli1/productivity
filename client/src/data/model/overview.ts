import { Result } from "../result";
import { IProject } from "./project";
import { ITask } from "./task";
import { Timestamp } from "./types/timestamp";

export interface IOverview {
  from: Timestamp;
  to: Timestamp;
  tasksCompleted: number;
  totalTimeInSeconds: number;
  tasksWithinTimeframe: ITask[];
}

export interface IOverviewProvider {
  daily: Result<IOverview>;
  weekly: Result<IOverview>;
  recents: Result<IProject[]>;

  refresh: () => void;
}

export interface IDateEntry {
  date: string;
  totalTimeSeconds: number;
}
