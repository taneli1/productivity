import { GraphQLClient } from "graphql-request";
import { BASE_URL } from "../../config/url";

export const getClient = (authToken: string | null) => {
  return new GraphQLClient(BASE_URL, {
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });
};
