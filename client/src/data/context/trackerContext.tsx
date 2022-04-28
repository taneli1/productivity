import React from "react";
import { ITracker } from "../model/timeTracker";

interface ITrackerContext extends ITracker {}

const defaultState: ITrackerContext = {
  current: null,
  tracking: false,
  startTracking: () => {},
  isTracking: () => {
    return false;
  },
  finishTracking: () => {},
};

const TrackerContext = React.createContext(defaultState);

export default TrackerContext;
