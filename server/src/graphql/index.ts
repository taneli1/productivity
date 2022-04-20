import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import { Container } from "typedi";
import { ProjectResolver } from "./resolvers/projectResolver";
import { isLoggedIn } from "./auth/authChecker";

/**
 * Initialize the schema for gql.
 */
export const init = async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    resolvers: [UserResolver, ProjectResolver],
    container: Container,
    authChecker: isLoggedIn,
  });

  return schema;
};
