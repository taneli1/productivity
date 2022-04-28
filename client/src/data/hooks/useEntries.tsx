import { useCallback } from "react";
import { requestQuery } from "../graphql/graphql";
import { IEntry } from "../model/entry";
import { ITrackerEntry } from "../model/timeTracker";
import { Result } from "../result";
import { querySaveEntry } from "./../graphql/query/entryQuery";

export const useEntries = () => {
  const saveEntry = useCallback(
    async (
      data: ITrackerEntry,
      onComplete: (result: Result<IEntry>) => void
    ) => {
      const variables = {
        data: {
          taskId: data.task._id,
          timeInSeconds: data.timeInSeconds,
        },
      };

      const res = await requestQuery<IEntry>(
        querySaveEntry,
        "createEntry",
        variables
      );
      onComplete(res);
    },
    []
  );

  return { saveEntry };
};
