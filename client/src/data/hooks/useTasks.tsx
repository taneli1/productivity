import { useCallback, useEffect, useState } from "react";
import { startOfDate } from "../../utils/dateTimeUtils";
import { ITask } from "../model/task";

interface TaskList {
  timestamp: number;
  tasks: ITask[];
}

export const useTasks = () => {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [sourceTasks, setSourceTasks] = useState<ITask[]>([]);

  const createTaskLists = useCallback((tasks: ITask[]) => {
    if (!tasks || tasks.length === 0) {
      setTaskLists([]);
      return;
    }
    const timestampToTaskArray = new Map<number, ITask[]>();

    tasks.forEach((task) => {
      // Transform the task timestamp to start of the date it represents
      const tsStartOfDate = startOfDate(task.completionTs);
      if (tsStartOfDate === undefined) {
        return;
      }
      const existing = timestampToTaskArray.get(tsStartOfDate);

      if (!existing) {
        timestampToTaskArray.set(tsStartOfDate, [task]);
      } else {
        const added = [...existing, task];
        timestampToTaskArray.set(tsStartOfDate, added);
      }
    });

    let asTaskLists: TaskList[] = [];
    timestampToTaskArray.forEach((tasks, timestamp) => {
      const data: TaskList = {
        timestamp: timestamp,
        tasks: tasks,
      };
      asTaskLists.push(data);
    });

    const sorted = asTaskLists
      .slice()
      .filter((it) => it.timestamp !== 0)
      .sort((a, b) => a.timestamp - b.timestamp);

    sorted.push(asTaskLists.find((it) => it.timestamp === 0)!!);

    setTaskLists(sorted.reverse());
  }, []);

  useEffect(() => {
    if (!sourceTasks) {
      return;
    }
    createTaskLists(sourceTasks);
  }, [createTaskLists, sourceTasks]);

  return {
    taskLists,
    setSourceTasks,
  };
};
