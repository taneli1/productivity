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
  children,
}) => {
  return (
    <button
      type="button"
      className={`${
        enabled === true ? "" : "disabled"
      } btn btn-primary pop text-white d-flex align-items-center shadow-sm`}
      onClick={onClick}
    >
      {children}
      {text}
    </button>
  );
};
