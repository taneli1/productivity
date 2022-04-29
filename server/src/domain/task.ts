import { TaskState } from "./state";
import { Timestamp } from "./types/timestamp";
import { UserInput } from "./types/userInput";
import { ILabel } from "./label";

export interface ITask {
  _id: string;
  name: string;
  state: TaskState;
  projectId: string;
  labels: ILabel[];
  creationTs: Timestamp;
  completionTs: Timestamp;
}

export interface ITaskService {
  getTasksForProject: (projectId: string) => Promise<ITask[]>;

  createTask: (params: INewTask) => Promise<ITask>;
  editTask: (params: IEditTask) => Promise<ITask>;

  deleteTask: (projectId: string, taskId: string) => Promise<ITask>;
}

export interface INewTask extends UserInput {
  name: string;
  projectId: string;
  labels: string[];
}

export interface IEditTask extends UserInput {
  taskId: string;
  name: string;
  state: TaskState;
}
