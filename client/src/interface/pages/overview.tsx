import { useEffect } from "react";
import { useOverview } from "../../data/hooks/useOverview";
import { useProjectOverviews } from "../../data/hooks/useProjectOverviews";
import { Header } from "../components/header";
import { WeekOverview } from "../components/weekOverview";

// Currently displays overviews for recent projects + weekly, with a few server
// endpoints could be done so that all projects with completed tasks this week
// are shown here
export const Overview = () => {
  const { weekly, recents } = useOverview();
  const { fetchProjectOverviews, overviews } = useProjectOverviews();

  useEffect(() => {
    console.log("Spam detection");
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

      return (
        <div key={it.tasksWithinTimeframe[0]._id} className="py-4">
          <WeekOverview
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
        <WeekOverview
          title="All projects"
          color="rgba(57, 157, 53, 1)"
          tasks={weekly.data?.tasksWithinTimeframe ?? []}
        />
      </div>

      <h4 className="header-title centered py-4">Recent projects</h4>

      {renderOverviews()}
    </div>
  );
};
