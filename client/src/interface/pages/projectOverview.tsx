import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProject } from "../../data/hooks/useProject";
import { useSingleProjectOverview } from "../../data/hooks/useProjectOverviews";
import { Header } from "../components/header";
import { ResultWrapper } from "../components/resultWrapper";
import { SimpleOverView } from "../components/simpleOverview";
import { WeekOverview } from "../components/weekOverview";

export const ProjectOverview = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { totalOverview, getProjectTotalOverview } = useSingleProjectOverview();
  const { projectRes, getProject } = useProject();
  const color = projectRes.data?.hex ?? "#000000";

  useEffect(() => {
    if (projectId) {
      getProject(projectId);
      getProjectTotalOverview(projectId);
    }
  }, [getProject, getProjectTotalOverview, projectId]);

  const openProjectView = () => {
    navigate("/projects/" + projectId);
  };

  return (
    <div className="container p-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <span
            className="colored-circle mb-2"
            style={{
              background: `${color}`,
              alignSelf: "center",
              marginRight: 8,
            }}
          />
          <Header text={projectRes.data?.name + " - Overview"} />
        </div>
        <p
          onClick={openProjectView}
          className="btn-link hover-op text-primary text-center pop d-inline-flex m-0 p-0"
        >
          Project view
        </p>
      </div>

      <ResultWrapper result={projectRes}>
        <div className="p-2 pt-4">
          <Header size="sm" text="Past week" />
          <WeekOverview color={color} tasks={projectRes.data?.tasks ?? []} />
        </div>

        <ResultWrapper result={totalOverview}>
          <SimpleOverView
            overview={totalOverview?.data!!}
            color={color}
            text="Project lifetime"
          />
        </ResultWrapper>
      </ResultWrapper>
    </div>
  );
};
