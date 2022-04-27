import { str_no_tasks } from "../../assets/strings";
import { TaskState } from "../../data/model/state";
import { ITask } from "../../data/model/task";
import { Task } from "./task";

interface TaskListProps {
  tasks?: ITask[] | null;
  accentColor?: string;
  editTask: (task: ITask, name: string, state: TaskState) => void;
}

export const TaskList: React.FunctionComponent<TaskListProps> = ({
  tasks,
  accentColor,
  editTask,
}) => {
  const list = tasks?.reverse()?.map((task) => (
    <Task
      onNameChanged={(name: string) => {
        editTask(task, name, task.state);
      }}
      accentColor={accentColor}
      key={task._id}
      task={task}
    />
  ));

  if (!tasks || tasks.length === 0) {
    return <p className="centered pt-5">{str_no_tasks}</p>;
  }

  return <div className="row justify-content-center px-5">{list}</div>;
};
