import { str_no_tasks } from "../../assets/strings";
import { TaskState } from "../../data/model/state";
import { ITask } from "../../data/model/task";
import { Task } from "./task";

interface TaskListProps {
  tasks?: ITask[] | null;
  accentColor?: string;
  listEmptyText?: string;
  editTask: (task: ITask, name: string, state: TaskState) => void;
  deleteTask: (id: string) => void;
}

export const TaskList: React.FunctionComponent<TaskListProps> = ({
  tasks,
  accentColor,
  listEmptyText,
  editTask,
  deleteTask,
}) => {
  const list = tasks
    ?.reverse()
    ?.map((task) => (
      <Task
        editTask={editTask}
        accentColor={accentColor}
        key={task._id}
        task={task}
        deleteTask={deleteTask}
      />
    ));

  if (!tasks || tasks.length === 0) {
    return (
      <p className="centered pt-5 pop fst-italic">
        {listEmptyText ?? str_no_tasks}
      </p>
    );
  }

  return <div className="row justify-content-center mx-1">{list}</div>;
};
