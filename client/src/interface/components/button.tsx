import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  enabled?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  onClick,
  enabled = true,
}) => {
  return (
    <button
      type="button"
      className={`${
        enabled === true ? "" : "disabled"
      } btn btn-primary pop text-white`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
