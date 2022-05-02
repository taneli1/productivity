import React, { useCallback } from "react";
import { startOfToday } from "../../utils/dateTimeUtils";
import { requestQuery, stateQueryRequest } from "../graphql/graphql";
import {
  queryDeleteProject,
  queryEditProject,
  queryProjectData,
} from "../graphql/query/projectQuery";
import { IProject } from "../model/project";
import { ProjectState, TaskState } from "../model/state";
import { ITask } from "../model/task";
import { Result } from "../result";
import {
  queryCreateTask,
  queryDeleteTask,
  queryEditTask,
} from "./../graphql/query/taskQuery";

export const useProject = () => {
  const [projectRes, setProjectRes] = React.useState(Result.idle<IProject>());
  const [taskEditRes, setTaskEditRes] = React.useState(Result.idle<ITask>());
  const [projectEditRes, setProjectEditRes] = React.useState(
    Result.idle<IProject>()
  );
  const [taskCreationRes, setTaskCreationRes] = React.useState(
    Result.idle<ITask>()
  );

  const getProject = useCallback(async (id: string) => {
    const vars = {
      id: id,
    };
    await stateQueryRequest<IProject>(
      setProjectRes,
      queryProjectData,
      "project",
      vars
    );
  }, []);

  const editProject = async (
    name: string,
    color: string,
    state: ProjectState
  ) => {
    const vars = {
      data: {
        projectId: projectRes.data?._id,
        hex: color,
        name,
        state,
      },
    };
    await stateQueryRequest<IProject>(
      setProjectEditRes,
      queryEditProject,
      "editProject",
      vars,
      (data: IProject) => {
        // Todo updt data instead
        getProject(projectRes?.data?._id ?? "");
      }
    );
  };

  const getSecondsToday = (): number => {
    const secondsTodayTotal = projectRes.data?.tasks
      ?.flatMap((task) => task.entries)
      .filter((entry) => entry && entry?.createdAt > startOfToday())
      .map((entry) => entry!!.timeInSeconds)
      .reduce((acc, entry) => acc + entry, 0);

    return secondsTodayTotal ?? 0;
  };

  const deleteCurrentProject = async (
    onDeleted: (project: IProject) => void
  ) => {
    const vars = {
      id: projectRes.data?._id,
    };
    const res = await requestQuery<IProject>(
      queryDeleteProject,
      "deleteProject",
      vars
    );
    if (res.isSuccess()) {
      onDeleted(res.data!!);
    }
  };

  const createTask = async (name: string) => {
    const variables = {
      data: { name: name, projectId: projectRes?.data?._id },
    };
    await stateQueryRequest<ITask>(
      setTaskCreationRes,
      queryCreateTask,
      "createTask",
      variables,
      (data: ITask) => {
        // Todo updt data instead
        getProject(projectRes?.data?._id ?? "");
      }
    );
  };

  const editTask = async (task: ITask, name: string, state: TaskState) => {
    const variables = {
      data: { projectId: projectRes?.data?._id, taskId: task._id, name, state },
    };
    await stateQueryRequest<ITask>(
      setTaskEditRes,
      queryEditTask,
      "editTask",
      variables,
      (data: ITask) => {
        // Todo updt data instead
        getProject(projectRes?.data?._id ?? "");
      }
    );
  };

  const deleteTask = async (id: string, onDeleted: (task: ITask) => void) => {
    const variables = {
      projectId: projectRes?.data?._id,
      id,
    };
    console.log(variables);

    const res = await requestQuery<ITask>(
      queryDeleteTask,
      "deleteProject",
      variables
    );
    if (res.isSuccess()) {
      onDeleted(res.data!!);
      getProject(projectRes?.data?._id ?? "");
    }
  };

  return {
    projectRes,
    getProject,
    getSecondsToday,
    taskCreationRes,
    createTask,
    taskEditRes,
    editTask,
    projectEditRes,
    editProject,
    deleteCurrentProject,
    deleteTask,
  };
};
