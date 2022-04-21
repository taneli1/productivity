import { TaskState } from "./state";
import { Timestamp } from "./types/timestamp";
import { UserInput } from "./types/userInput";

export interface ITask {
  _id: string;
  name: string;
  state: TaskState;
  projectId: string;
  creationTs: Timestamp;
  completionTs: Timestamp;
}

export interface ITaskService {
  getTasksForProject: () => Promise<ITask[]>;

  createTask: () => Promise<ITask>;
  editTask: () => Promise<ITask>;
  deleteTask: () => Promise<ITask>;
}

export interface INewTask extends UserInput {
  name: string;
  projectId: string;
}

export interface IEditTask extends UserInput {
  name: string;
  state: TaskState;
}
