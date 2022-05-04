import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import {
  MdArrowCircleUp,
  MdCheckCircle,
  MdPauseCircleFilled,
  MdPlayCircleFilled,
} from "react-icons/md";
import { useTracker } from "../../data/hooks/useTracker";
import { TaskState } from "../../data/model/state";
import { ITask } from "../../data/model/task";
import { formatSeconds, startOfToday } from "../../utils/dateTimeUtils";

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
  const borderStyle = thisTaskTracked
    ? {
        border: `2px solid ${accentColor}`,
        borderRadius: 6,
        minHeight: 55,
        margin: 2,
      }
    : { border: `1px solid #e9e9e9`, minHeight: 55, margin: 2 };

  const finishNameEdit = () => {
    if (task.name !== editedName) {
      editTask(task, editedName, task.state);
    }
    setEditing(false);
  };

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

  /**
   * Returns a tuple: 0 - seconds today | 1- seconds in total
   */
  const timeSpent = (): [number, number] => {
    const total = task?.entries
      ?.map((entry) => entry.timeInSeconds)
      .reduce((prev, next) => prev + next, 0);

    const today = task?.entries
      ?.filter((entry) => entry.createdAt > startOfToday())
      .map((entry) => entry.timeInSeconds)
      .reduce((prev, next) => prev + next, 0);

    return [today ?? 0, total ?? 0];
  };

  const timeText = () => {
    const spent = timeSpent();

    return formatSeconds(spent[1]) + "/" + formatSeconds(spent[0]);
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center rounded shadow-sm px-3"
      style={borderStyle}
    >
      <div
        onClick={() => setEditing(true)}
        className="d-flex flex-fill py-1 align-items-center"
        style={{ minHeight: 32 }}
      >
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

      <p className="px-3 m-0 pop fst-italic" style={{ color: "#6F" }}>
        {timeText()}
      </p>

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
          <>
            {!thisTaskTracked && (
              <div
                style={{ width: 32, height: 32 }}
                onClick={markAsComplete}
                className="hover-op"
              >
                <MdCheckCircle size="32" color={accentColor} />
              </div>
            )}
          </>
        )}

        {/* Delete btn */}
        {task.state === TaskState.TODO && !thisTaskTracked && (
          <div
            style={{ width: 32, height: 32 }}
            onClick={() => deleteTask(task._id)}
            className="hover-op"
          >
            <IoMdTrash size="32" color="#6f6f6f" />
          </div>
        )}

        {/* Start time track btn */}
        {task.state === TaskState.TODO && (
          <>
            {thisTaskTracked ? (
              <div
                style={{ width: 48, height: 48 }}
                onClick={toggleTracking}
                className="hover-op"
              >
                <MdPauseCircleFilled size="48" color="#2a8354" />
              </div>
            ) : (
              <div
                style={{ width: 48, height: 48 }}
                onClick={toggleTracking}
                className="hover-op"
              >
                <MdPlayCircleFilled
                  size="48"
                  color={tracking ? "#6f6f6f" : "#2a8354"}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
