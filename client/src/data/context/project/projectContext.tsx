import React from "react";
import { IProject } from "../../model/project";
import { ProjectState, TaskState } from "../../model/state";
import { ITask } from "../../model/task";
import { Result } from "../../result";

interface IProjectContext {
  projectRes: Result<IProject>;
  getProject: (id: string) => Promise<void>;
  getSecondsToday: () => number;
  taskCreationRes: Result<ITask>;
  createTask: (name: string) => Promise<void>;
  editTask: (task: ITask, name: string, state: TaskState) => Promise<void>;
  projectEditRes: Result<IProject>;
  editProject: (
    name: string,
    color: string,
    state: ProjectState
  ) => Promise<void>;
  deleteCurrentProject: (
    onDeleted: (project: IProject) => void
  ) => Promise<void>;
  deleteTask: (id: string, onDeleted: (task: ITask) => void) => Promise<void>;
  refresh: () => void;
}

const throwingFn = () => {
  throw new Error("Use via context...");
};

const defaultState: IProjectContext = {
  projectRes: Result.idle(),
  getProject: throwingFn,
  getSecondsToday: throwingFn,
  taskCreationRes: Result.idle(),
  createTask: throwingFn,
  editTask: throwingFn,
  projectEditRes: Result.idle(),
  editProject: throwingFn,
  deleteCurrentProject: throwingFn,
  deleteTask: throwingFn,
  refresh: throwingFn,
};

const ProjectContext = React.createContext(defaultState);

export default ProjectContext;
