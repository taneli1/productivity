import { useState } from "react";
import { str_project_state } from "../../assets/strings";
import { ProjectState } from "../../data/model/state";

interface ProjectStateSelectorProps {
  value: ProjectState;
  onChanged: (state: ProjectState) => void;
}

export const ProjectStateSelector: React.FunctionComponent<
  ProjectStateSelectorProps
> = ({ value, onChanged }) => {
  const [options] = useState(Object.values(ProjectState));

  const onValueChange = (e: any) => {
    onChanged(e.target.value);
  };

  return (
    <div>
      <label>{str_project_state}</label>
      <select
        onChange={onValueChange}
        className="form-select"
        aria-label="Default select example"
      >
        {/* <label>{str_project_state}</label> */}
        {options.map((option) => (
          <option
            key={option}
            className={`${value === option ? "selected" : ""}`}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
