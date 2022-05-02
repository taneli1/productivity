import React from "react";
import OverviewContext from "../context/overview/overviewContext";

export const useOverview = () => {
  return React.useContext(OverviewContext);
};
