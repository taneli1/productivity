import { useEffect } from "react";
import { str_home } from "../../assets/strings";
import { useOverview } from "../../data/hooks/useOverview";
import { ResultWrapper } from "../components/resultWrapper";
import { SimpleOverView } from "../components/simpleOverview";
import { Header } from "./../components/header";

export const Home = () => {
  const { daily, weekly, fetchOverviews } = useOverview();

  useEffect(() => {
    fetchOverviews();
  }, [fetchOverviews]);

  return (
    <div className="container p-3">
      <Header text={str_home} />
      <div className="d-flex justify-content-between p-5">
        <ResultWrapper result={daily}>
          <SimpleOverView overview={daily.data!!} />
        </ResultWrapper>
        <ResultWrapper result={weekly}>
          <SimpleOverView overview={weekly.data!!} />
        </ResultWrapper>
      </div>
      <p>Time stuff</p>
    </div>
  );
};
