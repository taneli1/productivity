import { FiClock } from "react-icons/fi";
import { RiCheckDoubleFill } from "react-icons/ri";
import { str_completed_tasks, str_task_time } from "../../assets/strings";
import { IOverview } from "../../data/model/overview";
import { formatSeconds } from "../../utils/dateTimeUtils";
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
      <h4 className="header-title fst-italic">{text}</h4>
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
              {formatSeconds(overview?.totalTimeInSeconds)}
            </h3>
          </div>
          <p className="pop mt-2">{str_task_time}</p>
        </div>
      </div>
    </div>
  );
};
