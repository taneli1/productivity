import { useUser } from "../../hooks/useUser";
import AuthContext from "./authContext";

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const { user, login, logout, register } = useUser();

  return {
    user,
    login,
    logout,
    register,
  };
};
