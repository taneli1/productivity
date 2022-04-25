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
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />;
  }

  return children;
};
