import { ProjectState } from "./state";
import { UserInput } from "./types/userInput";
import { Timestamp } from "./types/timestamp";

export interface IProject {
  _id: string;
  userId: string;
  name: string;
  hex: string;
  state: ProjectState;
  creationDate: Timestamp;
}

export interface IProjectService {
  getProject: (id: string) => Promise<IProject>;
  getProjects: (userId: string) => Promise<IProject[]>;

  createProject: (userId: string, params: INewProject) => Promise<IProject>;
  editProject: (params: IEditProject) => Promise<IProject>;
  deleteProject: (id: string) => Promise<IProject>;
  getRecentlyWorkedOnProjects: (
    userId: string,
    limit: number
  ) => Promise<IProject[]>;
}

export interface INewProject extends UserInput {
  name: string;
  hex: string;
}

export interface IEditProject extends UserInput {
  projectId: string;
  name: string;
  hex: string;
  state: ProjectState;
}
