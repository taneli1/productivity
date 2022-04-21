import { AuthenticationError } from "apollo-server-express";
import { AuthChecker, MiddlewareFn } from "type-graphql";
import { isLabelOwner, isProjectOwner } from "../../database/functions/utils";
import { CustomContext } from "./context";

export const isAuthenticated: AuthChecker<CustomContext> = async ({
  context,
}): Promise<boolean> => {
  if (!context.user) {
    throw new AuthenticationError("You need to log in.");
  }
  return true;
};

export const confirmIsProjectOwner: MiddlewareFn<CustomContext> = async (
  { args, context },
  next
) => {
  const userId = context.user._id;
  const projectId = args.data.projectId || args.projectId;

  if (!(await isProjectOwner(userId, projectId))) {
    throw new Error("You do not own this project.");
  }

  return next();
};

export const confirmIsLabelOwner: MiddlewareFn<CustomContext> = async (
  { args, context },
  next
) => {
  const userId = context.user._id;
  const labelId = args.id;

  if (!(await isLabelOwner(userId, labelId))) {
    throw new Error("You do not own this label.");
  }

  return next();
};
