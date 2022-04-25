import { Result } from "../result";

export const tryAsync = async <T>(): Promise<Result<T>> => {
  try {
    return Result.error();
  } catch (error) {
    return Result.error();
  }
};
