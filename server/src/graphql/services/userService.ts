import { Service } from "typedi";
import { INewUser, IUserService } from "../../domain/user";
import User from "../../database/models/userModel";

@Service()
export class UserService implements IUserService {
  async createUser(params: INewUser) {
    const res = await User.create({
      username: params.username,
      password: params.password,
      creationDate: Date.now().toString(),
    });

    return res;
  }

  async getUserWithId(id: string) {
    const u = await User.findById(id);
    if (!u) {
      throw new Error("User with this id does not exist");
    }
    return u;
  }

  async getUserWithName(username: string) {
    const u = await User.findOne({ username: username });
    if (!u) {
      throw new Error("User with this username does not exist");
    }
    return u;
  }
}
