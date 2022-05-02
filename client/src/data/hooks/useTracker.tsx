import React from "react";
import TrackerContext from "../context/tracker/trackerContext";

export const useTracker = () => {
  return React.useContext(TrackerContext);
};
