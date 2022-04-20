import { State } from "./state";
import { UserInput } from "./types/userInput";
import { Timestamp } from "./types/timestamp";

export interface IProject {
  id: string;
  userId: string;
  name: string;
  hex: string;
  state: State;
  creationDate: Timestamp;
}

export interface IProjectService {
  getProjects: () => Promise<IProject[]>;

  createProject: (params: INewProject) => Promise<IProject>;
  editProject: (params: IEditProject) => Promise<IProject>;
}

export interface INewProject extends UserInput {
  name: string;
  hex: string;
}

export interface IEditProject extends UserInput {
  id: string;
  name: string;
  hex: string;
  state: State;
}
