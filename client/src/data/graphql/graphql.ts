import { GraphQLClient } from "graphql-request";
import { BASE_URL } from "../../config/url";
import Cookies from "js-cookie";
import { Result } from "../result";

export const getClient = (authToken: string | null = null) => {
  return new GraphQLClient(BASE_URL, {
    headers: {
      authorization: `Bearer ${authToken ?? Cookies.get("token")}`,
    },
  });
};

/**
 * Wrapper to handle requests for useState.
 */
export const stateQueryRequest = async <T>(
  stateSetter: (result: Result<T>) => void,
  query: string,
  queryName: string,
  variables?: any,
  onSuccess?: (data: T) => void
) => {
  stateSetter(Result.loading<T>());
  const res = await requestQuery<T>(query, queryName, variables);
  stateSetter(res);

  if (res.isSuccess() && onSuccess) {
    onSuccess(res.data!!);
  }
};

export const requestQuery = async <T>(
  query: string,
  queryName: string,
  variables?: any
): Promise<Result<T>> => {
  const client = getClient();

  try {
    const res = await client.request(query, variables);
    const data = res[`${queryName}`];
    console.log(data);
    return Result.success<T>(data);
  } catch (error) {
    console.log("sendQuery, operation failed:", error);
    return Result.error();
  }
};
