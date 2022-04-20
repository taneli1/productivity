import { Service, Inject } from "typedi";
import {
  IEditProject,
  INewProject,
  IProject,
  IProjectService,
} from "../../domain/project";

@Service()
export class ProjectService implements IProjectService {
  async getProjects() {
    return [];
  }

  async createProject(params: INewProject): Promise<IProject> {
    throw new Error("todo");
  }

  async editProject(params: IEditProject): Promise<IProject> {
    throw new Error("todo");
  }
}
