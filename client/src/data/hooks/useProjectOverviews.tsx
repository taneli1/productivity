import { useCallback, useEffect, useRef, useState } from "react";
import {
  getAllWeekDays,
  getWeekDay,
  minusHours,
} from "../../utils/dateTimeUtils";
import { requestQuery, stateQueryRequest } from "../graphql/graphql";
import { queryProjectOverview } from "../graphql/query/overviewQuery";
import { IEntry } from "../model/entry";
import { IDateEntry, IOverview } from "../model/overview";
import { ITask } from "../model/task";
import { Result } from "../result";

export const useSingleProjectOverview = () => {
  const [totalOverview, setTotalOverview] = useState<Result<IOverview>>(
    Result.idle()
  );

  const getProjectTotalOverview = useCallback(async (id: string) => {
    const today = new Date();

    const params = {
      projectId: id,
      from: 0,
      to: today.getTime(),
    };

    await stateQueryRequest<IOverview>(
      setTotalOverview,
      queryProjectOverview,
      "getProjectOverview",
      params
    );
  }, []);

  return { totalOverview, getProjectTotalOverview };
};

/**
 * TODO Better implementation of this whole thing
 */
export const useProjectOverviews = () => {
  const [overviews, setOverviews] = useState<Result<IOverview[]>>(
    Result.idle()
  );
  const isLoading = useRef(false);

  /**
   * Fetch all project overview, override existing state
   */
  const fetchProjectOverviews = useCallback(async (ids: string[]) => {
    if (isLoading.current) {
      return;
    }
    setOverviews(Result.loading());
    isLoading.current = true;

    const today = new Date();

    const responses = await Promise.all(
      ids.map(async (id) => {
        const weekParams = {
          projectId: id,
          from: minusHours(today, 144),
          to: today.getTime(),
        };

        return await requestQuery<IOverview>(
          queryProjectOverview,
          "getProjectOverview",
          weekParams
        );
      })
    );

    const allOk = !responses.map((it) => it.isSuccess()).includes(false);
    if (!allOk) {
      setOverviews(Result.error());
    } else {
      const data = responses.map((it) => it.data!!);
      setOverviews(Result.success(data));
    }

    isLoading.current = false;
  }, []);

  return { fetchProjectOverviews, overviews };
};

export const useWeekOverview = (tasks: ITask[]) => {
  const [weekData, setWeekData] = useState<IDateEntry[]>([]);

  useEffect(() => {
    const map = new Map<string, IEntry[]>();
    getAllWeekDays().forEach((it) => {
      map.set(it, []);
    });

    tasks.forEach((task) => {
      if (!task.entries) {
        return;
      }

      for (const entry of task.entries) {
        const weekday = getWeekDay(entry.createdAt);

        const existing = map.get(weekday);

        if (existing) {
          map.set(weekday, [...existing, entry]);
        } else {
          map.set(weekday, [entry]);
        }
      }

      return map;
    });

    let weekEntries: IDateEntry[] = [];
    map.forEach((entries, weekday) => {
      const e: IDateEntry = {
        date: weekday,
        totalTimeSeconds: entries
          .map((it) => it.timeInSeconds)
          .reduce((prev, next) => prev + next, 0),
      };
      weekEntries.push(e);
    });

    setWeekData(weekEntries);
  }, [tasks]);

  return { weekData };
};
