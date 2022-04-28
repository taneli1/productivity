import { ITask } from "./task";

export interface ITrackerEntry {
  tempId: string;
  task: ITask;
  timeInSeconds: number;
}

export interface ITracker {
  current: ITrackerEntry | null;
  tracking: boolean;

  startTracking: (task: ITask) => void;
  finishTracking: () => void;

  isTracking: (taskId: string) => boolean;
}
