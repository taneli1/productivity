import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { confirmIsProjectOwner } from "../auth/authChecker";
import { CustomContext } from "../auth/context";
import { EditTaskInput, NewTaskInput, Task } from "../schemas/taskSchema";
import { EntryService } from "../services/entryService";
import { TaskService } from "../services/taskService";

@Service()
@Resolver((of) => Task)
export class TaskResolver {
  constructor(
    private taskService: TaskService,
    private entryService: EntryService
  ) {}

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

  @Authorized()
  @UseMiddleware(confirmIsProjectOwner)
  @Mutation((returns) => Task)
  async deleteTask(@Arg("projectId") projectId: string, @Arg("id") id: string) {
    return await this.taskService.deleteTask(projectId, id);
  }

  @Authorized()
  @FieldResolver()
  async entries(@Root() task: Task, @Ctx() ctx: CustomContext) {
    const res = await this.entryService.getAllTaskEntries(
      ctx.user._id,
      task._id
    );
    return res;
  }
}
