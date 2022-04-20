import { AuthChecker, MiddlewareFn } from "type-graphql";

export const isLoggedIn: AuthChecker<any> = async ({
  root,
  args,
  context,
  info,
}): Promise<boolean> => {
  return true;
};

export const isAuthorized: MiddlewareFn = async ({ args, context }, next) => {
  console.log("CONTEXT:", context);
  console.log("args:", args);
  return next();
};
