import React from "react";
import { FiClock } from "react-icons/fi";
import { formatSeconds } from "../../utils/dateTimeUtils";

interface TimeDisplayProps {
  seconds: number;
  text: string;
  color?: string;
  tracking?: boolean;
}

export const TimeDisplay: React.FunctionComponent<TimeDisplayProps> = ({
  seconds,
  text,
  color,
  tracking,
}) => {
  const c = color ?? "#2a8354";
  const border = color ? { border: `1px solid ${c}`, borderRadius: 6 } : {};

  return (
    <div
      className={`px-2 py-1 m-0 d-inline-flex flex-column ${
        color ? "shadow-sm" : ""
      } ${tracking ? "blink" : ""}`}
      style={border}
    >
      <p className="m-0 p-0" style={{ color: "#acacac" }}>
        {text}
      </p>
      <div className="d-flex flex-row mt-1">
        <FiClock className="me-1" size="24" color={c} />
        <h4 className="pop">{formatSeconds(seconds)}</h4>
      </div>
    </div>
  );
};
