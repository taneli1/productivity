import { Service } from "typedi";
import {
  IEditProject,
  INewProject,
  IProject,
  IProjectService,
} from "../../domain/project";
import Project from "../../database/models/projectModel";
import { ProjectState } from "../../domain/state";

@Service()
export class ProjectService implements IProjectService {
  async getProject(id: string): Promise<IProject> {
    const p = await Project.findById(id).lean();
    if (!p) {
      throw new Error("Project with this id not found");
    }
    return p;
  }

  async getProjects(userId: string) {
    return await Project.find({ userId: userId }).lean();
  }

  async createProject(userId: string, params: INewProject): Promise<IProject> {
    return await Project.create({
      hex: params.hex,
      name: params.name,
      userId: userId,
      creationDate: Date.now().toString(),
    });
  }

  async deleteProject(id: string): Promise<IProject> {
    const p = await Project.findByIdAndDelete(id);
    if (!p) {
      throw new Error("Project with this id not found");
    }

    return p;
  }

  async editProject(params: IEditProject): Promise<IProject> {
    // Mongoose does not validate enums on update query for some reason, check manually
    const validStates = Object.values(ProjectState);
    if (!validStates.includes(params.state)) {
      throw new Error("Project state is not valid");
    }

    const res = await Project.findByIdAndUpdate(
      params.projectId,
      { name: params.name, hex: params.hex, state: params.state },
      { new: true }
    );

    if (!res) {
      throw new Error("Error happened while editing project.");
    }

    return res;
  }
}
