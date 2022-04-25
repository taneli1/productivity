import React from "react";
import { IProject } from "../../data/model/project";

interface ProjectListProps {
  data: IProject[];
  onProjectClick: (projectId: string) => void;
}

export const ProjectList: React.FunctionComponent<ProjectListProps> = ({
  data,
  onProjectClick,
}) => {
  const projects = data.map((project) => {
    return (
      <li onClick={() => onProjectClick(project._id)} key={project._id}>
        {project.name}
      </li>
    );
  });

  return <ul>{projects}</ul>;
};
