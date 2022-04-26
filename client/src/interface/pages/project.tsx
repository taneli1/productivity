import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../../data/hooks/useProject";
import { Header } from "../components/header";

export const Project: React.FunctionComponent = () => {
  const { projectId } = useParams();
  const { projectRes, getProject } = useProject();

  useEffect(() => {
    if (projectId) {
      getProject(projectId);
    }
  }, [getProject, projectId]);

  if (projectRes.isLoading()) {
    return (
      <div className="centered-page">
        <p className="loading-spinner"></p>
      </div>
    );
  }

  return (
    <div className="container pt-3">
      <Header text={projectRes.data?.name} />
    </div>
  );
};
