import { Timestamp } from "./types/timestamp";
import { ProjectState } from "./state";

export interface IProject {
  _id: string;
  userId: string;
  name: string;
  hex: string;
  state: ProjectState;
  creationDate: Timestamp;
}
