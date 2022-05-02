import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { str_home, str_recents } from "../../assets/strings";
import { useOverview } from "../../data/hooks/useOverview";
import { ProjectList } from "../components/projectList";
import { ResultWrapper } from "../components/resultWrapper";
import { SimpleOverView } from "../components/simpleOverview";
import { Header } from "./../components/header";

export const Home = () => {
  const navigate = useNavigate();
  const { daily, weekly, refresh, recents } = useOverview();

  useEffect(() => {
    refresh();
  }, [refresh]);

  const onProjectClicked = (projectId: string) => {
    navigate("/projects/" + projectId);
  };

  return (
    <div className="container p-3">
      <Header text={str_home} />
      <div
        className="d-flex justify-content-between p-5"
        style={{ maxWidth: "1000px", margin: "auto" }}
      >
        <ResultWrapper result={daily}>
          <SimpleOverView
            color="rgba(57, 157, 53, 1)"
            overview={daily.data!!}
            text="Today"
          />
        </ResultWrapper>
        <ResultWrapper result={weekly}>
          <SimpleOverView
            color="rgba(57, 157, 53, 1)"
            overview={weekly.data!!}
            text="Week"
          />
        </ResultWrapper>
      </div>
      <div>
        <div className="ps-3 pt-3">
          <Header text={str_recents} size="sm" />
        </div>
        <ResultWrapper pageCentered={false} result={recents}>
          <ProjectList
            projects={recents.data ?? []}
            onProjectClick={onProjectClicked}
            errText={"No recent projects."}
          />
        </ResultWrapper>
      </div>
    </div>
  );
};
