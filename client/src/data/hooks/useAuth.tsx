import React from "react";
import AuthContext from "../context/auth/authContext";

export const useAuth = () => {
  return React.useContext(AuthContext);
};
