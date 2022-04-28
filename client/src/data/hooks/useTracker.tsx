import React from "react";
import TrackerContext from "./../context/trackerContext";

export const useTracker = () => {
  return React.useContext(TrackerContext);
};
