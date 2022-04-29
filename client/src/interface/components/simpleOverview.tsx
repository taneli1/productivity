import { FiClock } from "react-icons/fi";
import { RiCheckDoubleFill } from "react-icons/ri";
import { str_completed_tasks, str_task_time } from "../../assets/strings";
import { IOverview } from "../../data/model/overview";
import { Header } from "./header";
interface SimpleOverviewParams {
  overview?: IOverview;
  color: string;
  text: string;
}

export const SimpleOverView: React.FunctionComponent<SimpleOverviewParams> = ({
  overview,
  color,
  text,
}) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <Header text={text} size="sm" />

      <div className="d-flex flex-wrap pt-3">
        <div className="p-4">
          <div className="d-flex pop align-items-center">
            <RiCheckDoubleFill size="42" color={color} />
            <h3 className="fw-bold m-0 p-0 ms-2">{overview?.tasksCompleted}</h3>
          </div>
          <p className="pop mt-2">{str_completed_tasks}</p>
        </div>

        <div className="p-4">
          <div className="d-flex pop align-items-center ">
            <FiClock size="42" color={color} />
            <h3 className="fw-bold m-0 p-0 ms-2">
              {overview?.totalTimeInSeconds}s
            </h3>
          </div>
          <p className="pop mt-2">{str_task_time}</p>
        </div>
      </div>
    </div>
  );
};
