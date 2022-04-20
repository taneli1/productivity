import { Timestamp } from "./types/timestamp";
import { UserInput } from "./types/userInput";

export interface IUser {
  _id: string;
  username: string;
  password?: string;
  creationDate: Timestamp;
}

export interface IUserService {
  login: (
    request: Request,
    response: Response,
    params: ICredentials
  ) => Promise<IUser>;

  createUser: (params: ICredentials) => Promise<IUser>;
  getUserWithId: (id: string) => Promise<IUser>;
  getUserWithName: (username: string) => Promise<IUser>;
}

export interface ICredentials extends UserInput {
  username: string;
  password: string;
}
