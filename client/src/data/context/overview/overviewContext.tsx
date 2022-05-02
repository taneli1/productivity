import React from "react";
import { IOverviewProvider } from "../../model/overview";
import { Result } from "../../result";

interface IOverviewContext extends IOverviewProvider {}

const defaultState: IOverviewContext = {
  daily: Result.idle(),
  weekly: Result.idle(),
  recents: Result.idle(),
  refresh: () => {},
};

const OverviewProvider = React.createContext(defaultState);

export default OverviewProvider;
