import React from "react";

interface HeaderProps {
  text?: string;
}

export const Header: React.FunctionComponent<HeaderProps> = ({ text }) => {
  return <h3 className="header-title">{text}</h3>;
};
