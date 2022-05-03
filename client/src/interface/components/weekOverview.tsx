import * as am5 from "@amcharts/amcharts5";
import { useLayoutEffect, useRef } from "react";
import { FiClock } from "react-icons/fi";
import { RiCheckDoubleFill } from "react-icons/ri";
import { str_completed_tasks, str_task_time } from "../../assets/strings";
import { useWeekOverview } from "../../data/hooks/useProjectOverviews";
import { TaskState } from "../../data/model/state";
import { ITask } from "../../data/model/task";
import { setupWeekChart } from "../../utils/charts";
import { formatSeconds } from "../../utils/dateTimeUtils";
import { Header } from "./header";

interface WeekOverviewProps {
  title?: string;
  color: string;
  tasks: ITask[];
  onOpenProject?: () => void;
}

export const WeekOverview: React.FunctionComponent<WeekOverviewProps> = ({
  title,
  tasks,
  color,
  onOpenProject,
}) => {
  const { weekData } = useWeekOverview(tasks);
  const totalTime = weekData
    .map((it) => it.totalTimeSeconds)
    .reduce((prev, next) => prev + next, 0);
  const completedCount = tasks.filter(
    (it) => it.state === TaskState.DONE
  ).length;
  const id = useRef((Math.random() * 10000000).toString());

  useLayoutEffect(() => {
    let root = am5.Root.new(id.current);
    setupWeekChart(root, weekData, color);

    return () => {
      root.dispose();
    };
  }, [color, weekData]);

  return (
    <div>
      <div className="d-flex">
        {title && (
          <>
            <span
              className="colored-circle mb-2"
              style={{
                background: `${color}`,
                alignSelf: "center",
                marginRight: 8,
              }}
            />
            <Header size="sm" text={title} />
          </>
        )}
      </div>

      <div className="d-flex p-2">
        <div id={id.current} style={{ height: "300px", width: "70%" }}></div>
        <div className="d-flex flex-wrap flex-column pt-3">
          <div className="p-1">
            <div className="d-flex pop align-items-center">
              <RiCheckDoubleFill size="42" color={color} />
              <h3 className="fw-bold m-0 p-0 ms-2">{completedCount}</h3>
            </div>
            <p className="pop mt-2">{str_completed_tasks}</p>
          </div>

          <div className="p-1">
            <div className="d-flex pop align-items-center ">
              <FiClock size="42" color={color} />
              <h3 className="fw-bold m-0 p-0 ms-2">
                {formatSeconds(totalTime)}
              </h3>
            </div>
            <p className="pop mt-2">{str_task_time}</p>
          </div>
          {onOpenProject && (
            <div>
              <button
                onClick={onOpenProject}
                className="btn btn-white"
                style={{ background: color }}
              >
                <p className="p-0 m-0 text-white pop">Details</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
