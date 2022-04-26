import React, { useCallback } from "react";
import { getClient } from "../graphql/graphql";
import { queryProjectData } from "../graphql/query/projectQuery";
import { IProject } from "../model/project";
import { Result } from "../result";

export const useProject = () => {
  const [projectRes, setProjectRes] = React.useState(Result.idle<IProject>());

  const getProject = useCallback(async (id: string) => {
    setProjectRes(Result.loading());
    const client = getClient();
    const query = queryProjectData;
    const params = {
      id: id,
    };

    try {
      const res = await client.request(query, params);
      const data: IProject = res.project;
      setProjectRes(Result.success(data));
    } catch (error) {
      console.log("Failed to get project data:", error);
      setProjectRes(Result.error());
    }
  }, []);

  return { projectRes, getProject };
};
