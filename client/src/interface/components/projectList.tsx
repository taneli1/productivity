import React from "react";
import { str_no_projects } from "../../assets/strings";
import { IProject } from "../../data/model/project";
import { ProjectCard } from "./projectCard";

interface ProjectListProps {
  projects: IProject[];
  onProjectClick: (projectId: string) => void;
  errText?: string;
  pageCentered?: boolean;
}

export const ProjectList: React.FunctionComponent<ProjectListProps> = ({
  projects,
  onProjectClick,
  errText,
  pageCentered,
}) => {
  const list = projects.map((project) => (
    <ProjectCard key={project._id} project={project} onClick={onProjectClick} />
  ));

  if (projects.length < 1) {
    return (
      <p className={`centered${pageCentered ? "-page" : " pt-4"}`}>
        {errText ?? str_no_projects}
      </p>
    );
  }

  return <div className="row justify-content-center pt-5">{list}</div>;
};
