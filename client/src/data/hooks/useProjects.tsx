import React, { useState } from "react";
import { getClient } from "../graphql/graphql";
import {
  queryCreateProject,
  queryProjectList,
} from "../graphql/query/projectQuery";
import { IProject } from "../model/project";
import { Result } from "../result";

export const useProjects = () => {
  const [projectList, setProjectList] = useState(Result.idle<IProject[]>());
  const [projectCreationRes, setProjectCreationRes] = useState(
    Result.idle<IProject>()
  );

  const getProjects = React.useCallback(async () => {
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
  }, []);

  const createProject = async (name: string, hex: string) => {
    setProjectCreationRes(Result.loading());
    const client = getClient();
    const query = queryCreateProject;
    const params = {
      data: {
        name,
        hex,
      },
    };

    try {
      const res = await client.request(query, params);
      const data: IProject = res.createProject;
      setProjectCreationRes(Result.success(data));

      // Also updt project list
      setProjectList(Result.success([...projectList.data!!, data]));
    } catch (error) {
      console.log("Failed to create project:", error);
      setProjectCreationRes(Result.error());
    }
  };

  const clearProjectCreationRes = () => {
    setProjectCreationRes(Result.idle());
  };

  return {
    projectList,
    getProjects,
    projectCreationRes,
    createProject,
    clearProjectCreationRes,
  };
};
