import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOverview } from "../../data/hooks/useOverview";
import { useProjectOverviews } from "../../data/hooks/useProjectOverviews";
import { Header } from "../components/header";
import { ResultWrapper } from "../components/resultWrapper";
import { WeekOverview } from "../components/weekOverview";

// Currently displays overviews for recent projects + weekly, with a few server
// endpoints could be done so that all projects with completed tasks this week
// are shown here
export const Overview = () => {
  const navigate = useNavigate();
  const { weekly, recents } = useOverview();
  const { fetchProjectOverviews, overviews } = useProjectOverviews();

  useEffect(() => {
    const projectIds = recents.data?.map((it) => it._id);
    if (!projectIds) {
      return;
    }
    fetchProjectOverviews(projectIds);
  }, [fetchProjectOverviews, recents.data]);

  const renderOverviews = () => {
    return overviews.data?.map((it) => {
      const project = recents.data?.find(
        (project) => project._id === it.tasksWithinTimeframe[0].projectId
      );
      if (!project) {
        return null;
      }
      const firstTask = it.tasksWithinTimeframe[0];
      return (
        <div key={firstTask._id} className="py-4">
          <WeekOverview
            onOpenProject={() => {
              navigate(firstTask.projectId);
            }}
            title={project.name}
            color={project.hex}
            tasks={it.tasksWithinTimeframe ?? []}
          />
        </div>
      );
    });
  };

  return (
    <div className="container p-3">
      <Header text="Overview" />

      <h4 className="header-title centered py-4">Past week total</h4>
      <div className="py-3">
        <ResultWrapper result={weekly}>
          <WeekOverview
            title="All projects"
            color="#2a8354"
            tasks={weekly.data?.tasksWithinTimeframe ?? []}
          />
        </ResultWrapper>
      </div>

      <h4 className="header-title centered py-4">Recent projects</h4>

      {renderOverviews()}
    </div>
  );
};
