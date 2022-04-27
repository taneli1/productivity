import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  enabled?: boolean;
  color?: string;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  onClick,
  enabled = true,
  children,
  color,
}) => {
  return (
    <button
      type="button"
      className={`${
        enabled === true ? "" : "disabled"
      } btn btn-primary pop text-white d-flex align-items-center shadow-sm`}
      onClick={onClick}
      style={{ background: color, border: color ?? 0 }}
    >
      {children}
      {text}
    </button>
  );
};
