import React, { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { useNavigate } from "react-router-dom";
import {
  str_completed_projects,
  str_hide,
  str_show,
  title_projects,
} from "../../assets/strings";
import { useProjects } from "../../data/hooks/useProjects";
import { ProjectState } from "../../data/model/state";
import { Header } from "../components/header";
import { NewProject } from "../components/newProject";
import { ProjectList } from "../components/projectList";
import { ResultWrapper } from "../components/resultWrapper";

export const Projects = () => {
  const {
    getProjects,
    projectList,
    projectCreationRes,
    createProject,
    clearProjectCreationRes,
  } = useProjects();
  const [oldProjectsOpen, setOldProjectsOpen] = useState(false);

  const completedProjects =
    projectList.data?.filter((it) => it.state === ProjectState.FINISHED) ?? [];
  const ongoingProjects =
    projectList.data?.filter((it) => it.state === ProjectState.ONGOING) ?? [];

  const navigate = useNavigate();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const onProjectClicked = (projectId: string) => {
    navigate(`${projectId}`);
  };

  return (
    <ResultWrapper result={projectList}>
      <div className="p-3">
        <div className="d-flex justify-content-between">
          <Header text={title_projects} />
          <NewProject
            createProject={createProject}
            projectCreationRes={projectCreationRes}
            onCloseCalled={() => clearProjectCreationRes}
          />
        </div>

        <div className="pt-3">
          <ProjectList
            projects={ongoingProjects}
            onProjectClick={onProjectClicked}
          />
        </div>

        {completedProjects.length > 0 && (
          <div className="py-5">
            <div className="ps-2 d-flex align-items-center">
              <h5 className="pop m-0">{str_completed_projects}</h5>
              <button
                className="btn ms-2 btn-link"
                onClick={() => setOldProjectsOpen(!oldProjectsOpen)}
              >
                {oldProjectsOpen ? str_hide : str_show}
              </button>
            </div>
            <Collapse in={oldProjectsOpen}>
              <div>
                <ProjectList
                  projects={completedProjects}
                  onProjectClick={onProjectClicked}
                />
              </div>
            </Collapse>
          </div>
        )}
      </div>
    </ResultWrapper>
  );
};
