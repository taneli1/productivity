import { ILabel } from "./label";
import { TaskState } from "./state";
import { Timestamp } from "./types/timestamp";

export interface ITask {
  _id: string;
  name: string;
  state: TaskState;
  projectId: string;
  labels: ILabel[];
  creationTs: Timestamp;
  completionTs: Timestamp;
}
