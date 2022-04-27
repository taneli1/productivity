import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  str_new_task,
  str_no_tasks_today,
  str_overview,
  str_tasks_title,
  str_tasks_today,
} from "../../assets/strings";
import { useProject } from "../../data/hooks/useProject";
import { TaskState } from "../../data/model/state";
import { startOfToday } from "../../utils/dateUtils";
import { Button } from "../components/button";
import { SecondaryButton } from "../components/buttonSecondary";
import { Header } from "../components/header";
import { ResultWrapper } from "../components/resultWrapper";
import { TaskList } from "../components/taskList";
import { ManageProject } from "./../components/manageProject";

export const Project: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    projectRes,
    getProject,
    createTask,
    editTask,
    editProject,
    deleteCurrentProject,
    deleteTask,
  } = useProject();

  useEffect(() => {
    if (projectId) {
      getProject(projectId);
    }
  }, [getProject, projectId]);

  if (projectRes.isLoading()) {
    return (
      <div className="centered-page">
        <p className="loading-spinner"></p>
      </div>
    );
  }

  console.log(projectRes.data?.tasks);

  const createEmptyTask = () => {
    createTask(" ");
  };

  const onDeleteProject = () => {
    deleteCurrentProject(() => {
      navigate(-1);
    });
  };

  const onDeleteTask = (id: string) => {
    deleteTask(id, () => {
      // todo after task deleted
    });
  };

  const color = `${projectRes.data?.hex}`;

  return (
    <ResultWrapper result={projectRes}>
      <div>
        {/* Header */}
        <div className="container pt-3 d-flex justify-content-between">
          <Header text={projectRes.data?.name} />
          <div>
            {projectRes.data && (
              <ManageProject
                onDelete={onDeleteProject}
                onSubmit={editProject}
                project={projectRes.data}
              />
            )}
            <SecondaryButton onClick={() => {}} text={str_overview}>
              <svg
                style={{
                  width: 24,
                  height: 24,
                  color: color,
                }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9 17H7V10H9V17M13 17H11V7H13V17M17 17H15V13H17V17Z"
                />
              </svg>
            </SecondaryButton>
          </div>
        </div>

        {/* Tasks */}
        <div className="container pt-3">
          {/* Tasks header */}
          <div className="p-3 d-flex justify-content-between align-items-center">
            <Header size="sm" text={str_tasks_title} />
            <Button text={str_new_task} onClick={createEmptyTask}>
              <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                />
              </svg>
            </Button>
          </div>

          {/* Tasks content */}
          <TaskList
            accentColor={color}
            tasks={projectRes?.data?.tasks?.filter(
              (it) => it.state === TaskState.TODO
            )}
            editTask={editTask}
            deleteTask={onDeleteTask}
          />

          <p className="pop centered pt-4">{str_tasks_today}</p>
          <TaskList
            listEmptyText={str_no_tasks_today}
            accentColor={color}
            tasks={projectRes?.data?.tasks?.filter(
              (it) =>
                it.state === TaskState.DONE &&
                parseInt(it.completionTs) > startOfToday()
            )}
            editTask={editTask}
            deleteTask={onDeleteTask}
          />
        </div>
      </div>
    </ResultWrapper>
  );
};
