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
      className="hover-op card container hover-shadow p-5 col-5 my-1 mx-1 shadow-sm"
      onClick={() => onClick(project._id)}
      style={{ border: `1px solid ${project.hex}` }}
      key={project._id}
    >
      <h4 className="text-center align-content-center pop">
        <span
          className="colored-circle"
          style={{
            background: `${project.hex}`,
            alignSelf: "center",
            marginRight: 8,
          }}
        />
        {project.name}
      </h4>
    </div>
  );
};
