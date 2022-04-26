import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { title_projects } from "../../assets/strings";
import { useProjects } from "../../data/hooks/useProjects";
import { Header } from "../components/header";
import { NewProject } from "../components/newProject";
import { ProjectList } from "../components/projectList";

export const Projects = () => {
  const {
    getProjects,
    projectList,
    projectCreationRes,
    createProject,
    clearProjectCreationRes,
  } = useProjects();
  const navigate = useNavigate();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const onProjectClicked = (projectId: string) => {
    navigate(`${projectId}`);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between">
        <Header text={title_projects} />
        <NewProject
          createProject={createProject}
          projectCreationRes={projectCreationRes}
          onCloseCalled={() => clearProjectCreationRes}
        />
      </div>

      <ProjectList projects={projectList} onProjectClick={onProjectClicked} />
    </div>
  );
};
