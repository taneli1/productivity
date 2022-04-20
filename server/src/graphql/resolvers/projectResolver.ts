import {
  Arg,
  Authorized,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { isAuthorized } from "../auth/authChecker";
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

  @Query((returns) => [Project])
  async projects() {
    return await this.projectService.getProjects();
  }

  @UseMiddleware(isAuthorized)
  @Mutation((returns) => Project)
  async createProject(@Arg("data") data: NewProjectInput): Promise<Project> {
    return this.projectService.createProject(data);
  }

  @Mutation((returns) => Project)
  async editProject(@Arg("data") data: EditProjectInput): Promise<Project> {
    return this.projectService.createProject(data);
  }
}
