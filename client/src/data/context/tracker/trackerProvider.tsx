import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useEntries } from "../../hooks/useEntries";
import { ITask } from "../../model/task";
import { ITracker, ITrackerEntry } from "../../model/timeTracker";
import TrackerContext from "./trackerContext";

interface TrackerProviderProps {
  onEntrySaved: () => void;
}

export const TrackerProvider: React.FunctionComponent<TrackerProviderProps> = ({
  children,
  onEntrySaved,
}) => {
  const tracker = useTracker(onEntrySaved);

  return (
    <TrackerContext.Provider value={tracker}>
      {children}
    </TrackerContext.Provider>
  );
};

const useTracker = (onEntrySaved: () => void): ITracker => {
  const { saveEntry } = useEntries();
  const [tracking, setTracking] = useState(false);
  const [current, setCurrent] = useState<ITrackerEntry | null>(null);
  const [entryToSave, setEntryToSave] = useState<ITrackerEntry | null>(null);
  const savingEntryId = useRef("");

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
    if (
      entryToSave === null ||
      entryToSave.timeInSeconds === 0 ||
      savingEntryId.current === entryToSave.tempId
    ) {
      return;
    }
    savingEntryId.current = entryToSave.tempId;

    saveEntry(entryToSave, (response) => {
      // TODO Retry logic on failures
      onEntrySaved();
      if (entryToSave.task._id === response.data?.taskId) {
        setEntryToSave(null);
        savingEntryId.current = "";
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
