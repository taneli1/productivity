import { Service } from "typedi";
import { IEditTask, INewTask, ITask, ITaskService } from "../../domain/task";
import Task from "../../database/models/taskModel";
import { TaskState } from "../../domain/state";

@Service()
export class TaskService implements ITaskService {
  async getTasksForProject(projectId: string): Promise<ITask[]> {
    const tasks = await Task.find({ projectId: projectId }).lean();
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

    const updtObj = await this.buildTaskUpdateObject(params);

    const res = await Task.findByIdAndUpdate(params.taskId, updtObj, {
      new: true,
    });

    if (!res) {
      throw new Error("Task not found");
    }

    return res;
  }

  async deleteTask(projectId: string, id: string): Promise<ITask> {
    const res = await Task.findById(id);

    if (!res) {
      throw new Error("Task not found");
    }

    if (res.projectId.valueOf() !== projectId) {
      throw new Error(
        "Should make a better implementation of project ownership checks"
      );
    }

    const deleteRes = await Task.findByIdAndRemove(id);

    if (!deleteRes) {
      throw new Error("Could not delete task");
    }

    return deleteRes;
  }

  private async buildTaskUpdateObject(params: IEditTask): Promise<{}> {
    let obj: any = {
      name: params.name,
      state: params.state,
    };

    const taskData = await Task.findById(params.taskId).lean();
    if (!taskData) {
      throw new Error("Could not find task with this id");
    }

    // Logic to edit the completion timestamp
    const paramStateDone = params.state === TaskState.DONE;
    if (paramStateDone) {
      const timeStampEditNeeded = taskData.state === TaskState.TODO;
      if (timeStampEditNeeded) {
        obj.completionTs = Date.now();
      }
    } else {
      const timeStampShouldBeReset =
        taskData.completionTs !== null && taskData.completionTs !== undefined;
      if (timeStampShouldBeReset) {
        obj.completionTs = null;
      }
    }

    return obj;
  }
}
