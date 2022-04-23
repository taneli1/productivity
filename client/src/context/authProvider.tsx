import React from "react";
import AuthContext from "./authContext";

const useAuth = () => {
  const [user, setUser] = React.useState<boolean | null>(null);

  return {
    user,
    login(username: string, password: string) {
      setUser(true);
    },
    logout() {
      return new Promise((res) => {
        setUser(null);
      });
    },
  };
};

export const AuthProvider = ({ children }: any) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
