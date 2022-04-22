import {
  Arg,
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
import {
  EditProjectInput,
  NewProjectInput,
  Project,
} from "../schemas/projectSchema";
import { ProjectService } from "../services/projectService";
import { TaskService } from "../services/taskService";

@Service()
@Resolver((of) => Project)
export class ProjectResolver {
  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  @Authorized()
  @Query((returns) => [Project])
  async projects(@Ctx() ctx: CustomContext) {
    return await this.projectService.getProjects(ctx.user._id);
  }

  @Authorized()
  @Mutation((returns) => Project)
  async createProject(
    @Arg("data") data: NewProjectInput,
    @Ctx() ctx: CustomContext
  ) {
    return this.projectService.createProject(ctx.user._id, data);
  }

  @Authorized()
  @UseMiddleware(confirmIsProjectOwner)
  @Mutation((returns) => Project)
  async editProject(@Arg("data") data: EditProjectInput) {
    return this.projectService.editProject(data);
  }

  @FieldResolver()
  async tasks(@Root() project: Project) {
    return await this.taskService.getTasksForProject(project._id);
  }
}
