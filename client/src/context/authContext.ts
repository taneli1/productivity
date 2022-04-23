import * as React from "react";

interface IAuthContext {
  user: any | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const defaultState: IAuthContext = {
  user: null,
  login: (username: string, password: string) => {},
  logout: () => {},
};

const AuthContext = React.createContext(defaultState);

export default AuthContext;
