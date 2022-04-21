import { IUser } from "../../domain/user";

export interface CustomContext {
  req: any;
  res: any;
  user: IUser;
}
