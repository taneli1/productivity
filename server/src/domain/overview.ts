import { ITask } from "./task";
import { Timestamp } from "./types/timestamp";

export interface IOverview {
  from: Timestamp;
  to: Timestamp;
  tasksCompleted: number;
  totalTimeInSeconds: number;
  tasksWithinTimeframe: ITask[];
}

export interface IOverviewService {
  queryTimeframe: (
    uid: string,
    from: Timestamp,
    to: Timestamp
  ) => Promise<IOverview>;

  queryProjectTimeFrame: (
    projectId: string,
    from: Timestamp,
    to: Timestamp
  ) => Promise<IOverview>;
}
