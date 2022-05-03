import { useEffect } from "react";
import { AiOutlineAreaChart } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
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
import { startOfToday } from "../../utils/dateTimeUtils";
import { Button } from "../components/button";
import { SecondaryButton } from "../components/buttonSecondary";
import { Header } from "../components/header";
import { ResultWrapper } from "../components/resultWrapper";
import { TaskList } from "../components/taskList";
import { TimeDisplay } from "../components/timeDisplay";
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
    getSecondsToday,
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

  const navigateToTaskArchive = () => {
    navigate("/tasks/" + projectId);
  };

  const navigateToOverview = () => {
    navigate("/overview/" + projectId);
  };

  const color = projectRes.data?.hex;

  return (
    <ResultWrapper result={projectRes}>
      <div>
        {/* Header */}
        <div className="container pt-3 d-flex justify-content-between">
          <div className="">
            <div className="d-flex">
              <span
                className="colored-circle mb-2"
                style={{
                  background: `${color}`,
                  alignSelf: "center",
                  marginRight: 8,
                }}
              />
              <Header text={projectRes.data?.name} />
            </div>
            <TimeDisplay
              seconds={getSecondsToday()}
              text={"Today:"}
              color={color}
            />
          </div>
          <div>
            {projectRes.data && (
              <ManageProject
                onDelete={onDeleteProject}
                onSubmit={editProject}
                project={projectRes.data}
              />
            )}
            <SecondaryButton onClick={navigateToOverview} text={str_overview}>
              <AiOutlineAreaChart size="1.4em" color={color} />
            </SecondaryButton>
          </div>
        </div>

        {/* Tasks */}
        <div className="container pt-3">
          {/* Tasks header */}
          <div className="p-3 d-flex justify-content-between align-items-center">
            <Header size="sm" text={str_tasks_title} />
            <div className="d-flex justify-content-between align-items-center">
              <div className="pt-3">
                <p className="me-3 p-0 pop fst-italic">Time total/today</p>
              </div>
              <Button text={str_new_task} onClick={createEmptyTask}>
                <MdAdd className="me-1" size="1.4em" color="white" />
              </Button>
            </div>
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

          {/* Tasks today */}
          <p className="pop centered pt-4">{str_tasks_today}</p>
          <TaskList
            listEmptyText={str_no_tasks_today}
            accentColor={color}
            tasks={projectRes?.data?.tasks?.filter(
              (it) =>
                it.state === TaskState.DONE && it.completionTs > startOfToday()
            )}
            editTask={editTask}
            deleteTask={onDeleteTask}
          />
          <div className="centered">
            <p
              onClick={navigateToTaskArchive}
              className="btn-link hover-op text-primary text-center pop mt-5 d-inline-flex"
            >
              Open task archive
            </p>
          </div>
        </div>
      </div>
    </ResultWrapper>
  );
};
