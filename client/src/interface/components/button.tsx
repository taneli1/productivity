import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {text}
    </button>
  );
};
