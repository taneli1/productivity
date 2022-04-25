import React from "react";
import { IProject } from "../../data/model/project";
import { Result } from "../../data/result";
import { ProjectCard } from "./projectCard";

interface ProjectListProps {
  projects: Result<IProject[]>;
  onProjectClick: (projectId: string) => void;
}

export const ProjectList: React.FunctionComponent<ProjectListProps> = ({
  projects,
  onProjectClick,
}) => {
  const list = projects.data?.map((project) => (
    <ProjectCard project={project} onClick={onProjectClick} />
  ));

  return <div className="row justify-content-center pt-5">{list}</div>;
};
