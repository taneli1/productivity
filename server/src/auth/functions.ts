import jwt from "jsonwebtoken";
import passport from "passport";
import { ICredentials, IUser } from "../domain/user";
import { SECRET_KEY } from "../utils/values";

export const checkAuth = (req: any, res: any) => {
  return new Promise((resolve) => {
    passport.authenticate("jwt", (_, user, err) => {
      if (err) {
        return resolve(false);
      }
      return resolve(user);
    })(req, res);
  });
};

export const loginUser = async (
  req: any,
  res: any,
  params: ICredentials
): Promise<IUser | false> => {
  req.body.username = params.username;
  req.body.password = params.password;

  return await new Promise((resolve) =>
    passport.authenticate("local", (err, user, info) => {
      if (err || !user) {
        resolve(false);
      }
      const token = jwt.sign(user, SECRET_KEY);
      resolve({ ...user, token: token });
    })(req, res)
  );
};
