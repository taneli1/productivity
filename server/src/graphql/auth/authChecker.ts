import { AuthenticationError } from "apollo-server-express";
import { AuthChecker, MiddlewareFn } from "type-graphql";

/**
 * Check that the user is logged in.
 */
export const isAuthenticated: AuthChecker<any> = async ({
  root,
  args,
  context,
  info,
}): Promise<boolean> => {
  console.log("User:", context.user);
  if (!context.user) {
    throw new AuthenticationError("You are not logged in.");
  }
  return true;
};

/**
 * Check that the user is authorized to edit the content being accessed.
 */
export const isAuthorized: MiddlewareFn = async ({ args, context }, next) => {
  console.log("CONTEXT:", context);
  console.log("args:", args);
  return next();
};
