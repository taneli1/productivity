import { useCallback, useState } from "react";
import { minusDays } from "../../utils/dateUtils";
import { stateQueryRequest } from "../graphql/graphql";
import { queryTimeOverview } from "../graphql/query/overviewQuery";
import { IOverview } from "../model/overview";
import { Result } from "../result";

export const useOverview = () => {
  const [daily, setDaily] = useState<Result<IOverview>>(Result.idle());
  const [weekly, setWeekly] = useState<Result<IOverview>>(Result.idle());

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

  return { daily, weekly, fetchOverviews };
};
