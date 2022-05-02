import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../../data/hooks/useProject";
import { useTasks } from "../../data/hooks/useTasks";
import { formatUnix, startOfToday } from "../../utils/dateTimeUtils";
import { ResultWrapper } from "../components/resultWrapper";
import { TaskList } from "../components/taskList";
import { Header } from "./../components/header";

export const TaskArchive = () => {
  const { projectId } = useParams();
  const { projectRes, getProject, editTask, deleteTask } = useProject();
  const { taskLists, setSourceTasks } = useTasks();
  const project = projectRes.data;

  useEffect(() => {
    if (projectId) {
      getProject(projectId);
    }
  }, [getProject, projectId]);

  useEffect(() => {
    if (projectRes.isSuccess()) {
      setSourceTasks(projectRes.data?.tasks!!);
    }
  }, [projectRes, setSourceTasks]);

  const onDeleteTask = (id: string) => {
    deleteTask(id, () => {
      // todo after task deleted
    });
  };

  const renderLists = () => {
    if (!taskLists || taskLists.length === 0) {
      return (
        <p className="pop centered pt-5">No tasks for this project found.</p>
      );
    }

    return taskLists?.map((taskList) => {
      if (!taskList) {
        return null;
      }
      return (
        <div key={taskList.timestamp + "div"}>
          {renderListHeader(taskList.timestamp)}
          <TaskList
            key={taskList.timestamp}
            editTask={editTask}
            deleteTask={onDeleteTask}
            tasks={taskList.tasks}
            accentColor={project?.hex}
          />
        </div>
      );
    });
  };

  const renderListHeader = (timestamp: number): JSX.Element => {
    const today = startOfToday();
    let text;

    switch (timestamp) {
      case 0:
        text = "Todo";
        break;
      case today:
        text = "Today";
        break;
      default:
        text = formatUnix(timestamp);
        break;
    }

    return <h5 className="header-title py-4 centered">{text}</h5>;
  };

  return (
    <div className="container p-3">
      <ResultWrapper result={projectRes}>
        <div className="d-flex">
          <span
            className="colored-circle mb-2"
            style={{
              background: `${project?.hex}`,
              alignSelf: "center",
              marginRight: 8,
            }}
          />
          <Header text={`${project?.name} - Task archive`} />
        </div>

        {renderLists()}
      </ResultWrapper>
    </div>
  );
};
