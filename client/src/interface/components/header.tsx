import React from "react";

interface HeaderProps {
  text?: string;
  size?: "sm";
  color?: string;
}

export const Header: React.FunctionComponent<HeaderProps> = ({
  text,
  size,
  color,
}) => {
  const style = {
    color,
  };

  if (size === "sm") {
    return (
      <h4 className="header-title" style={style}>
        {text}
      </h4>
    );
  }

  return (
    <h3 className="header-title" style={style}>
      {text}
    </h3>
  );
};
