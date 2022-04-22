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
  let projectId = resolveProjectId(args);

  if (!(await isProjectOwner(userId, projectId))) {
    throw new Error("You do not own this project.");
  }

  return next();
};

const resolveProjectId = (args: any): string => {
  let projectId = args.data?.projectId;

  if (projectId === undefined) {
    projectId = args.projectId;
  }

  if (projectId === undefined) {
    projectId = args.id;
  }

  if (projectId === undefined) {
    throw new Error("Could not find project id from arguments");
  }

  return projectId;
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
