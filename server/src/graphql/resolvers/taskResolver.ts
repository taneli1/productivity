import {
  Arg,
  Args,
  Authorized,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { confirmIsProjectOwner } from "../auth/authChecker";
import { EditTaskInput, NewTaskInput, Task } from "../schemas/taskSchema";
import { TaskService } from "../services/taskService";

@Service()
@Resolver((of) => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Authorized()
  @UseMiddleware(confirmIsProjectOwner)
  @Query((returns) => [Task])
  async getProjectTasks(@Arg("id") id: string) {
    return await this.taskService.getTasksForProject(id);
  }

  @Authorized()
  @UseMiddleware(confirmIsProjectOwner)
  @Mutation((returns) => Task)
  async createTask(@Arg("data") data: NewTaskInput) {
    return await this.taskService.createTask(data);
  }

  @Authorized()
  @UseMiddleware(confirmIsProjectOwner)
  @Mutation((returns) => Task)
  async editTask(@Arg("data") data: EditTaskInput) {
    return await this.taskService.editTask(data);
  }
}
