import { GraphQLClient } from "graphql-request";
import { BASE_URL } from "../../config/url";
import Cookies from "js-cookie";

export const getClient = (authToken: string | null = null) => {
  return new GraphQLClient(BASE_URL, {
    headers: {
      authorization: `Bearer ${authToken ?? Cookies.get("token")}`,
    },
  });
};
