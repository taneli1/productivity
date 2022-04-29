import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import {
  MdArrowCircleUp,
  MdCheckCircle,
  MdOutlineDragIndicator,
  MdPauseCircleFilled,
  MdPlayCircleFilled,
} from "react-icons/md";
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
          <div className="hover-op pe-2">
            <MdOutlineDragIndicator size="24" color="#6f6f6f" />
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
          <div
            style={{ width: 32, height: 32 }}
            onClick={markAsUndone}
            className="hover-op"
          >
            <MdArrowCircleUp color={accentColor} size="32" />
          </div>
        ) : (
          <div
            style={{ width: 32, height: 32 }}
            onClick={markAsComplete}
            className="hover-op"
          >
            <MdCheckCircle size="32" color={accentColor} />
          </div>
        )}

        {/* Delete btn */}
        {task.state === TaskState.TODO && (
          <div
            style={{ width: 32, height: 32 }}
            onClick={toggleTracking}
            className="hover-op"
          >
            <IoMdTrash size="32" color="#6f6f6f" />
          </div>
        )}

        <p className="px-3 m-0" style={{ color: "#6F" }}>
          TIME
        </p>

        {/* Start time track btn */}
        {task.state === TaskState.TODO && (
          <>
            {thisTaskTracked ? (
              <div
                style={{ width: 48, height: 48 }}
                onClick={toggleTracking}
                className="hover-op"
              >
                <MdPauseCircleFilled size="48" color="rgb(57, 157, 53)" />
              </div>
            ) : (
              <div
                style={{ width: 48, height: 48 }}
                onClick={toggleTracking}
                className="hover-op"
              >
                <MdPlayCircleFilled
                  size="48"
                  color={tracking ? "#6f6f6f" : "rgb(57, 157, 53)"}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
