import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import { Container } from "typedi";
import { ProjectResolver } from "./resolvers/projectResolver";
import { isAuthenticated } from "./auth/authChecker";
import { LabelResolver } from "./resolvers/labelResolver";
import { TaskResolver } from "./resolvers/taskResolver";
import { EntryResolver } from "./resolvers/entryResolver";
import { OverviewResolver } from "./resolvers/OverviewResolver";

/**
 * Initialize the schema for gql.
 */
export const init = async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ProjectResolver,
      LabelResolver,
      TaskResolver,
      EntryResolver,
      OverviewResolver,
    ],
    container: Container,
    authChecker: isAuthenticated,
  });

  return schema;
};
