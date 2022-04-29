import { IOverview } from "../../data/model/overview";

interface SimpleOverviewParams {
  overview?: IOverview;
}

export const SimpleOverView: React.FunctionComponent<SimpleOverviewParams> = ({
  overview,
}) => {
  return <p>TASKS: {overview?.tasksCompleted}</p>;
};
