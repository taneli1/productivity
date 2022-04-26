import { Timestamp } from "./types/timestamp";
import { ProjectState } from "./state";
import { ITask } from "./task";

export interface IProject {
  _id: string;
  name: string;
  hex: string;
  state: ProjectState;
  creationDate: Timestamp;
  tasks: ITask[] | null;
}
