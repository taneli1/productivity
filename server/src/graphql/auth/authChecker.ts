import { AuthenticationError } from "apollo-server-express";
import { AuthChecker, MiddlewareFn } from "type-graphql";
import { CustomContext } from "./context";

export const isAuthenticated: AuthChecker<CustomContext> = async ({
  context,
}): Promise<boolean> => {
  if (!context.user) {
    throw new AuthenticationError("You need to log in.");
  }
  return true;
};

export const checkIsProjectOwner: MiddlewareFn<CustomContext> = async (
  { args, context },
  next
) => {
  console.log("CONTEXT:", context);
  console.log("args:", args);
  return next();
};
