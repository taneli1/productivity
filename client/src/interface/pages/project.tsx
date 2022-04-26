import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  str_manage,
  str_new_task,
  str_overview,
  str_tasks_title,
} from "../../assets/strings";
import { useProject } from "../../data/hooks/useProject";
import { Button } from "../components/button";
import { SecondaryButton } from "../components/buttonSecondary";
import { Header } from "../components/header";
import { TaskList } from "../components/taskList";

export const Project: React.FunctionComponent = () => {
  const { projectId } = useParams();
  const { projectRes, getProject } = useProject();

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

  const color = `#${projectRes.data?.hex}`;

  return (
    <div>
      {/* Header */}
      <div className="container pt-3 d-flex justify-content-between">
        <Header text={projectRes.data?.name} />
        <div>
          <SecondaryButton text={str_manage}>
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
                d="M21 13.1C20.9 13.1 20.7 13.2 20.6 13.3L19.6 14.3L21.7 16.4L22.7 15.4C22.9 15.2 22.9 14.8 22.7 14.6L21.4 13.3C21.3 13.2 21.2 13.1 21 13.1M19.1 14.9L13 20.9V23H15.1L21.2 16.9L19.1 14.9M21 9H13V3H21V9M13 18.06V11H21V11.1C20.24 11.1 19.57 11.5 19.19 11.89L13 18.06M11 13H3V3H11V13M11 21H3V15H11V21Z"
              />
            </svg>
          </SecondaryButton>
          <SecondaryButton text={str_overview}>
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
          <Button text={str_new_task} onClick={() => {}}>
            <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </svg>
          </Button>
        </div>

        {/* Tasks content */}
        <TaskList tasks={projectRes?.data?.tasks} />
      </div>
    </div>
  );
};
