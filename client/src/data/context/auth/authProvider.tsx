import { useUser } from "../../hooks/useUser";
import AuthContext from "./authContext";

const useAuth = () => {
  const { user, login, logout, register } = useUser();

  return {
    user,
    login,
    logout,
    register,
  };
};

export const AuthProvider = ({ children }: any) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
