import * as React from "react";
import { Credentials } from "../model/credentials";
import { IUser } from "../model/user";
import { Result } from "../result";

interface IAuthContext {
  user: Result<IUser> | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultState: IAuthContext = {
  user: null,
  login: async (credentials: Credentials) => {},
  logout: async () => {},
};

const AuthContext = React.createContext(defaultState);

export default AuthContext;
