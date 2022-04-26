export enum Status {
  Idle,
  Loading,
  Error,
  Ok,
}

export class Result<T> {
  data: T | null;
  status: Status;

  private constructor(data: T | null, status: Status) {
    this.data = data;
    this.status = status;
  }

  static success<T>(data: T) {
    return new Result(data, Status.Ok);
  }

  static error<T>() {
    return new Result<T>(null, Status.Error);
  }

  static loading<T>() {
    return new Result<T>(null, Status.Loading);
  }

  static idle<T>() {
    return new Result<T>(null, Status.Idle);
  }

  isLoading(): boolean {
    return this.status === Status.Loading;
  }

  isSuccess(): boolean {
    return this.status === Status.Ok;
  }

  isError(): boolean {
    return this.status === Status.Error;
  }

  isIdle(): boolean {
    return this.status === Status.Idle;
  }
}
