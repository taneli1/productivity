import { useState } from "react";
import { IProject } from "../model/project";
import { Result } from "../result";

export const useProjects = () => {
  const [projectResult, setProjectResult] = useState(Result.idle<IProject[]>());

  const getProjects = async () => {};

  return { projectResult, getProjects };
};
