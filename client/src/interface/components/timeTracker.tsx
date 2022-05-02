import { useOverview } from "../../data/hooks/useOverview";
import { useTracker } from "../../data/hooks/useTracker";
import { TimeDisplay } from "./timeDisplay";

interface TimeTrackerProps {}

export const TimeTracker: React.FunctionComponent<TimeTrackerProps> = ({}) => {
  const { daily } = useOverview();
  const { current, tracking, finishTracking } = useTracker();

  return (
    <div
      className="d-flex flex-column bg-white pop shadow-sm rounded justify-content-between overflow-hidden"
      style={{ width: 210, height: 110 }}
    >
      <div className="d-flex justify-content-between pe-1">
        <h5 className={`pt-2 ps-2 ${tracking ? "blink" : ""}`}>
          {tracking ? "Tracking" : "Not tracking"}
        </h5>
        {tracking && (
          <svg
            onClick={finishTracking}
            className="hover-op"
            style={{ width: 48, height: 48, color: "rgb(57, 157, 53)" }}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
            />
          </svg>
        )}
      </div>
      {tracking ? (
        <div className="">
          <TimeDisplay
            seconds={current?.timeInSeconds ?? 0}
            text={"Without break:"}
          />
        </div>
      ) : (
        <div className="">
          <TimeDisplay
            seconds={daily.data?.totalTimeInSeconds ?? 0}
            text={"Today:"}
          />
        </div>
      )}

      <div className="d-flex align-items-center ps-2 pb-2">
        <p
          className="fst-italic m-0 text-truncate pe-1"
          style={{ maxWidth: 165 }}
        >
          {current?.task?.name}
        </p>
      </div>
    </div>
  );
};
