import React from "react";
import { useOverview } from "../hooks/useOverview";
import { useProject } from "../hooks/useProject";
import { AuthProvider } from "./auth/authProvider";
import { OverviewProvider } from "./overview/overviewProvider";
import { ProjectProvider } from "./project/projectProvider";
import { TrackerProvider } from "./tracker/trackerProvider";

/**
 * Use in router
 */
export const ContextWrapper: React.FunctionComponent = ({ children }) => {
  return (
    <AuthProvider>
      <OverviewProvider>
        <ProjectProvider>
          <LinkRefreshFunctionality>{children}</LinkRefreshFunctionality>
        </ProjectProvider>
      </OverviewProvider>
    </AuthProvider>
  );
};

/**
 * Scuffed way to keep data updated (+ expensive, since we are re fetching all of the data..).
 * Initial implementation for hooks could not keep the data always up to date on UI.
 * Would need to write whole state management again to make better, but no time for that now.
 */
const LinkRefreshFunctionality: React.FunctionComponent = ({ children }) => {
  const { refresh: refreshOverviewData } = useOverview();
  const { refresh: refreshProjectData } = useProject();

  const keepUpdated = () => {
    refreshOverviewData();
    refreshProjectData();
  };

  return (
    <TrackerProvider onEntrySaved={keepUpdated}>{children}</TrackerProvider>
  );
};
