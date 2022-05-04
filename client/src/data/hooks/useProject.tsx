import React from "react";
import ProjectContext from "../context/project/projectContext";

export const useProject = () => {
  return React.useContext(ProjectContext);
};
