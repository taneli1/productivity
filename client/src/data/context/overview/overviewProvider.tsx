import { useCallback, useState } from "react";
import { minusHours, startOfToday } from "../../../utils/dateTimeUtils";
import { stateQueryRequest } from "../../graphql/graphql";
import { queryTimeOverview } from "../../graphql/query/overviewQuery";
import { queryRecentProjects } from "../../graphql/query/projectQuery";
import { IOverview } from "../../model/overview";
import { IProject } from "../../model/project";
import { Result } from "../../result";
import OverviewContext from "./overviewContext";

const useOverview = () => {
  const [recents, setRecents] = useState<Result<IProject[]>>(Result.idle());
  const [daily, setDaily] = useState<Result<IOverview>>(Result.idle());
  const [weekly, setWeekly] = useState<Result<IOverview>>(Result.idle());

  const fetchRecents = useCallback(() => {
    const params = {
      limit: 2, // < Max 2 recent projects fetched
    };

    stateQueryRequest<IProject[]>(
      setRecents,
      queryRecentProjects,
      "getRecents",
      params,
      () => {}
    );
  }, []);

  const fetchOverviews = useCallback(async () => {
    const today = new Date();
    const dayParams = {
      from: startOfToday(),
      to: today.getTime(),
    };
    const weekParams = {
      from: minusHours(today, 144),
      to: today.getTime(),
    };

    stateQueryRequest<IOverview>(
      setDaily,
      queryTimeOverview,
      "getTimeframeOverview",
      dayParams,
      () => {}
    );

    stateQueryRequest<IOverview>(
      setWeekly,
      queryTimeOverview,
      "getTimeframeOverview",
      weekParams,
      () => {}
    );
  }, []);

  const refresh = useCallback(() => {
    fetchOverviews();
    fetchRecents();
  }, [fetchOverviews, fetchRecents]);

  return { daily, weekly, refresh, recents };
};

export const OverviewProvider = ({ children }: any) => {
  const overview = useOverview();

  return (
    <OverviewContext.Provider value={overview}>
      {children}
    </OverviewContext.Provider>
  );
};
