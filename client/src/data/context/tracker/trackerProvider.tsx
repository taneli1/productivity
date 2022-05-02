import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useEntries } from "../../hooks/useEntries";
import { ITask } from "../../model/task";
import { ITracker, ITrackerEntry } from "../../model/timeTracker";
import TrackerContext from "./trackerContext";

const useTracker = (onEntrySaved: () => void): ITracker => {
  const { saveEntry } = useEntries();
  const [tracking, setTracking] = useState(false);
  const [current, setCurrent] = useState<ITrackerEntry | null>(null);
  const [entryToSave, setEntryToSave] = useState<ITrackerEntry | null>(null);

  /** Return the started interval */
  const handleTrackingStarted = (): any => {
    return setInterval(() => {
      setCurrent((data) => {
        if (data === null) {
          return null;
        }
        return { ...data!!, timeInSeconds: data!!.timeInSeconds + 1 };
      });
    }, 1000);
  };

  // TODO Replace with proper autosave etc
  useEffect(() => {
    if (tracking) {
      window.onbeforeunload = () => {
        return true;
      };
    }

    if (!tracking) {
      window.onbeforeunload = null;
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [tracking]);

  const handleTrackingStopped = useCallback((interval: any) => {
    clearInterval(interval);
    setCurrent((data) => {
      return { ...data!!, timeInSeconds: 0 };
    });
  }, []);

  useEffect(() => {
    let interval: any;
    if (tracking) {
      interval = handleTrackingStarted();
    } else if (!tracking) {
      handleTrackingStopped(interval);
    }
    return () => clearInterval(interval);
  }, [handleTrackingStopped, tracking]);

  // useEffect(() => {
  //   console.log("Current", current);
  // }, [current]);

  const startTracking = (task: ITask) => {
    saveCurrent();
    setCurrent({
      task: task,
      timeInSeconds: 0,
      tempId: uuid(),
    });
    setTracking(true);
  };

  const finishTracking = () => {
    setTracking(false);
    saveCurrent();
    setCurrent(null);
  };

  useEffect(() => {
    if (entryToSave === null || entryToSave.timeInSeconds === 0) {
      return;
    }

    saveEntry(entryToSave, (response) => {
      // TODO Retry logic on failures
      console.log("Save callback response:", response);
      onEntrySaved();
      if (entryToSave.task._id === response.data?.taskId) {
        setEntryToSave(null);
      }
    });
  }, [entryToSave, onEntrySaved, saveEntry]);

  const saveCurrent = () => {
    setEntryToSave(current);
  };

  const isTracking = (taskId: string) => {
    return current?.task?._id === taskId;
  };

  return { tracking, current, startTracking, isTracking, finishTracking };
};

export const TrackerProvider = ({ children, onEntrySaved }: any) => {
  const tracker = useTracker(onEntrySaved);

  return (
    <TrackerContext.Provider value={tracker}>
      {children}
    </TrackerContext.Provider>
  );
};
