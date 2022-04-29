import { useCallback, useState } from "react";
import { minusDays } from "../../utils/dateUtils";
import { stateQueryRequest } from "../graphql/graphql";
import { queryTimeOverview } from "../graphql/query/overviewQuery";
import { queryRecentProjects } from "../graphql/query/projectQuery";
import { IOverview } from "../model/overview";
import { IProject } from "../model/project";
import { Result } from "../result";

export const useOverview = () => {
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
      from: minusDays(today, 1),
      to: today.getTime(),
    };
    const weekParams = {
      from: minusDays(today, 6),
      to: today.getTime(),
    };
    console.log(dayParams.from);
    console.log(weekParams.from);

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
