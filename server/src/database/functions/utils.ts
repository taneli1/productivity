import Project from "../models/projectModel";
import Label from "../models/labelModel";

export const isProjectOwner = async (
  userId: string,
  projectId: string
): Promise<boolean> => {
  const project = await Project.findById(projectId).lean();

  if (!project) {
    throw new Error("Project with id " + projectId + "not found");
  }

  return project.userId.valueOf() == userId;
};

export const isLabelOwner = async (
  userId: string,
  labelId: string
): Promise<boolean> => {
  const label = await Label.findById(labelId).lean();

  if (!label) {
    throw new Error("Label with id " + labelId + "not found");
  }

  return label.userId.valueOf() == userId;
};
