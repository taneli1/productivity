import React, { useEffect } from "react";
import { str_new_project, title_projects } from "../../assets/strings";
import { useProjects } from "../../data/hooks/useProjects";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { ProjectList } from "../components/projectList";

export const Projects = () => {
  const { getProjects, projectList } = useProjects();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between">
        <Header text={title_projects} />
        <Button text={str_new_project} onClick={() => {}} />
      </div>

      <ProjectList projects={projectList} onProjectClick={() => {}} />
    </div>
  );
};
