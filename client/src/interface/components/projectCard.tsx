import { MdPlayCircleFilled } from "react-icons/md";
import { useTracker } from "../../data/hooks/useTracker";
import { IProject } from "../../data/model/project";

interface ProjectCardProps {
  project: IProject;
  onClick: (id: string) => void;
}

export const ProjectCard: React.FunctionComponent<ProjectCardProps> = ({
  project,
  onClick,
}) => {
  const { current } = useTracker();
  const thisProjectTracked = current?.task?.projectId === project._id;

  return (
    <div
      className="hover-op container hover-shadow col-5 my-1 mx-1 shadow-sm d-flex align-items-center rounded justify-content-center"
      onClick={() => onClick(project._id)}
      style={{
        border: `1px solid ${project.hex}`,
        maxWidth: "400px",
        height: "120px",
      }}
      key={project._id}
    >
      {thisProjectTracked ? (
        <div
          className="blink me-1"
          style={{
            width: 32,
            height: 32,
            position: "relative",
            top: 0,
            right: 0,
          }}
        >
          <MdPlayCircleFilled size="32" color={project.hex} />
        </div>
      ) : (
        <div className="d-inline-flex ">
          <span
            className="colored-circle"
            style={{
              background: `${project.hex}`,
              alignSelf: "center",
              marginRight: 8,
            }}
          />
        </div>
      )}
      <h4 className="pop p-0 m-0">{project.name}</h4>
    </div>
  );
};
