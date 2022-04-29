import { useState } from "react";
import { useTracker } from "../../data/hooks/useTracker";
import { TaskState } from "../../data/model/state";
import { ITask } from "../../data/model/task";

interface TaskProps {
  task: ITask;
  accentColor?: string;
  editTask: (task: ITask, name: string, state: TaskState) => void;
  deleteTask: (id: string) => void;
}

export const Task: React.FunctionComponent<TaskProps> = ({
  task,
  accentColor,
  editTask,
  deleteTask,
}) => {
  const { tracking, startTracking, finishTracking, isTracking } = useTracker();
  const thisTaskTracked = isTracking(task._id);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const finishNameEdit = () => {
    if (task.name !== editedName) {
      editTask(task, editedName, task.state);
    }
    setEditing(false);
  };

  console.log(task.entries);

  const markAsComplete = () => {
    editTask(task, editedName, TaskState.DONE);
  };

  const markAsUndone = () => {
    editTask(task, editedName, TaskState.TODO);
  };

  const toggleTracking = () => {
    if (thisTaskTracked) {
      finishTracking();
    } else {
      startTracking(task);
    }
  };

  return (
    <div
      className="d-flex justify-content-between border align-items-center rounded shadow-sm px-3"
      style={{ minHeight: 55 }}
    >
      <div
        onClick={() => setEditing(true)}
        className="d-flex flex-fill py-1 align-items-center"
        style={{ minHeight: 32 }}
      >
        {task.state === TaskState.TODO && (
          <div className="hover-op m-0 p-0 pe-2">
            <svg
              style={{ width: 24, height: 24, color: "#6f" }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21 11H3V9H21V11M21 13H3V15H21V13Z"
              />
            </svg>
          </div>
        )}

        {editing ? (
          <input
            autoFocus
            value={editedName}
            onChange={(e) => {
              setEditedName(e.target.value);
            }}
            type="text"
            className="form-control"
            onBlur={finishNameEdit}
          />
        ) : (
          <p className="p-0 m-0 pop text-break">{task.name}</p>
        )}
      </div>

      <div className="d-flex py-1 align-items-center">
        {/* Finished/NotFinished btn */}
        {task.state === TaskState.DONE ? (
          <svg
            className="hover-op"
            onClick={markAsUndone}
            style={{ width: 36, height: 36, color: accentColor }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,7L7,12H10V16H14V12H17L12,7Z"
            />
          </svg>
        ) : (
          <svg
            onClick={markAsComplete}
            className="hover-op"
            style={{ width: 36, height: 36, color: accentColor }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
            />
          </svg>
        )}

        {/* Delete btn */}
        {task.state === TaskState.TODO && (
          <svg
            onClick={() => deleteTask(task._id)}
            className="hover-op"
            style={{ width: 36, height: 36, color: "#6f" }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z"
            />
          </svg>
        )}

        <p className="px-3 m-0" style={{ color: "#6F" }}>
          TIME
        </p>

        {/* Start time track btn */}
        {task.state === TaskState.TODO && (
          <>
            {thisTaskTracked ? (
              <svg
                onClick={toggleTracking}
                className="hover-op"
                style={{ width: 48, height: 48, color: "rgb(57, 157, 53)" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                />
              </svg>
            ) : (
              <svg
                onClick={toggleTracking}
                className="hover-op"
                style={{
                  width: 48,
                  height: 48,
                  color: tracking ? "#6f6f6f" : "rgb(57, 157, 53)",
                }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                />
              </svg>
            )}
          </>
        )}
      </div>
    </div>
  );
};
