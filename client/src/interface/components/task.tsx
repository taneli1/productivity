import { ITask } from "../../data/model/task";

interface TaskProps {
  task: ITask;
}

export const Task: React.FunctionComponent<TaskProps> = ({ task }) => {
  return (
    <div className="d-flex justify-content-between border align-items-center rounded shadow-sm px-3">
      <p className="p-0 m-0 pop">{task.name}</p>
      <div className="d-flex py-1 align-items-center">
        <p className="px-2 m-0" style={{ color: "#6F" }}>
          TIME
        </p>
        <svg
          className="hover-op"
          style={{ width: 48, height: 48, color: "rgb(57, 157, 53)" }}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
      </div>
    </div>
  );
};
