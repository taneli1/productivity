import React from "react";
import { useOverview } from "../hooks/useOverview";
import { AuthProvider } from "./auth/authProvider";
import { OverviewProvider } from "./overview/overviewProvider";
import { TrackerProvider } from "./tracker/trackerProvider";

/**
 * Use in router
 */
export const ContextWrapper: React.FunctionComponent = ({ children }) => {
  return (
    <AuthProvider>
      <OverviewProvider>
        <LinkTrackerToOverview>{children}</LinkTrackerToOverview>
      </OverviewProvider>
    </AuthProvider>
  );
};

/**
 * A quick way to link the refresh function from
 * overview to tracker. Done so that the overview gets the latest
 * data after time tracker entry has been saved. (Could be done better, no time for now)
 */
const LinkTrackerToOverview: React.FunctionComponent = ({ children }) => {
  const { refresh } = useOverview();

  return <TrackerProvider onEntrySaved={refresh}>{children}</TrackerProvider>;
};
