import { Service } from "typedi";
import { IEditTask, INewTask, ITask, ITaskService } from "../../domain/task";
import Task from "../../database/models/taskModel";
import { TaskState } from "../../domain/state";

@Service()
export class TaskService implements ITaskService {
  async getTasksForProject(projectId: string): Promise<ITask[]> {
    console.log(projectId);
    const tasks = await Task.find({ projectId: projectId });
    return tasks;
  }

  async createTask(params: INewTask): Promise<ITask> {
    return await Task.create({
      labels: params.labels,
      name: params.name,
      projectId: params.projectId,
      creationTs: Date.now().toString(),
    });
  }

  async editTask(params: IEditTask): Promise<ITask> {
    const validStates = Object.values(TaskState);
    if (!validStates.includes(params.state)) {
      throw new Error("Task state is not valid");
    }

    const res = await Task.findByIdAndUpdate(
      params.taskId,
      {
        name: params.name,
        state: params.state,
      },
      { new: true }
    );

    if (!res) {
      throw new Error("Task not found");
    }

    return res;
  }

  async deleteTask(taskId: string): Promise<ITask> {
    const res = await Task.findByIdAndDelete(taskId);

    if (!res) {
      throw new Error("Task not found");
    }

    return res;
  }
}
