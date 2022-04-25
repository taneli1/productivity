import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { getClient } from "../graphql/graphql";
import { queryLogin } from "../graphql/query/userQuery";
import { Credentials } from "../model/credentials";
import { IUser } from "../model/user";
import { Result } from "../result";

export const useUser = () => {
  const [userResult, setUserResult] = useState(Result.idle<IUser>());

  const login = async (credentials: Credentials) => {
    const client = getClient(null);
    const query = queryLogin;
    const params = {
      credentials: credentials,
    };

    try {
      const res = await client.request(query, params);
      const data: IUser = res.login;
      saveTokenToCookie(data.token);
      setUserResult(Result.success(data));
    } catch (error) {
      setUserResult(Result.error<IUser>());
    }
  };

  const logout = async () => {
    console.log("logout");
    Cookies.remove("token");
    loadFromCookie();
  };

  const saveTokenToCookie = (token: string) => {
    Cookies.set("token", token);
  };

  const loadFromCookie = () => {
    const token = Cookies.get("token");
    if (!token) {
      setUserResult(Result.idle());
      return;
    }
    try {
      const decoded = jwt_decode(token) as any;
      const u: IUser = {
        username: decoded.username,
        token: token,
      };
      setUserResult(Result.success(u));
    } catch (error) {
      console.log("Failed to extract user data from token");
      setUserResult(Result.idle());
    }
  };

  React.useEffect(() => {
    loadFromCookie();
  }, []);

  return { user: userResult, login, logout };
};
