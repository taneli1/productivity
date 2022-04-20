import { Timestamp } from "./types/timestamp";
import { UserInput } from "./types/userInput";

export interface IUser {
  id: string;
  username: string;
  password: string;
  creationDate: Timestamp;
}

export interface IUserService {
  createUser: (params: INewUser) => Promise<IUser>;
  getUserWithId: (id: string) => Promise<IUser>;
  getUserWithName: (username: string) => Promise<IUser>;
}

export interface INewUser extends UserInput {
  username: string;
  password: string;
}
