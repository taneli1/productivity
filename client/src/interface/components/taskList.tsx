import { str_no_tasks } from "../../assets/strings";
import { ITask } from "../../data/model/task";
import { Task } from "./task";

interface TaskListProps {
  tasks?: ITask[] | null;
}

export const TaskList: React.FunctionComponent<TaskListProps> = ({ tasks }) => {
  const list = tasks?.map((task) => <Task key={task._id} task={task} />);

  if (!tasks || tasks.length === 0) {
    return <p className="centered pt-5">{str_no_tasks}</p>;
  }

  return <div className="row justify-content-center px-5">{list}</div>;
};
