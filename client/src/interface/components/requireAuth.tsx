import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../data/hooks/useAuth";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user?.data) {
      navigate("/login");
    }
  }, [navigate, user?.data]);

  if (document.cookie.split("=")[1] === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
