import { IProject } from "../../data/model/project";

interface ProjectCardProps {
  project: IProject;
  onClick: (id: string) => void;
}

export const ProjectCard: React.FunctionComponent<ProjectCardProps> = ({
  project,
  onClick,
}) => {
  return (
    <div
      className="card container hover-shadow p-5 col-5 my-1 mx-1 shadow-sm"
      onClick={() => onClick(project._id)}
      style={{ border: `2px solid #${project.hex}` }}
      key={project._id}
    >
      <h3 className="text-center align-content-center d-flex">
        {project.name}
      </h3>
    </div>
  );
};
