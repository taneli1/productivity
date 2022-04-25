import { useState } from "react";
import { getClient } from "../graphql/graphql";
import { queryProjectList } from "../graphql/query/projectQuery";
import { IProject } from "../model/project";
import { Result } from "../result";

export const useProjects = () => {
  const [projectList, setProjectList] = useState(Result.idle<IProject[]>());

  const getProjects = async () => {
    const client = getClient();
    const query = queryProjectList;

    try {
      const res = await client.request(query);
      const data: IProject[] = res.projects;
      setProjectList(Result.success(data));
    } catch (error) {
      console.log("Failed to get projects", error);
      setProjectList(Result.error<IProject[]>());
    }
  };

  return { projectList, getProjects };
};
