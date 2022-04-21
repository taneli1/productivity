import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { checkIsProjectOwner } from "../auth/authChecker";
import { CustomContext } from "../auth/context";
import {
  EditProjectInput,
  NewProjectInput,
  Project,
} from "../schemas/projectSchema";
import { ProjectService } from "../services/projectService";

@Service()
@Resolver((of) => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

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
  ): Promise<Project> {
    return this.projectService.createProject(ctx.user._id, data);
  }

  @Authorized()
  @UseMiddleware(checkIsProjectOwner)
  @Mutation((returns) => Project)
  async editProject(@Arg("data") data: EditProjectInput): Promise<Project> {
    return this.projectService.editProject(data);
  }
}
