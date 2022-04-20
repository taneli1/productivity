import { Service } from "typedi";
import { ICredentials, IUser, IUserService } from "../../domain/user";
import User from "../../database/models/userModel";
import { loginUser } from "../../auth/functions";
import bcrypt from "bcryptjs";

@Service()
export class UserService implements IUserService {
  async login(
    request: any,
    response: any,
    params: ICredentials
  ): Promise<IUser> {
    const u = await loginUser(request, response, params);
    if (!u) {
      throw new Error("Could not log in");
    }

    delete u.password;
    return u;
  }

  async createUser(params: ICredentials) {
    const hash = await bcrypt.hash(params.password, 12);
    const res = await User.create({
      username: params.username,
      password: hash,
      creationDate: Date.now().toString(),
    });

    delete res.password;
    return res;
  }

  async getUserWithId(id: string) {
    const u = await User.findById(id);
    if (!u) {
      throw new Error("User with this id does not exist");
    }
    delete u.password;
    return u;
  }

  async getUserWithName(username: string) {
    const u = await User.findOne({ username: username });
    if (!u) {
      throw new Error("User with this username does not exist");
    }
    delete u.password;
    return u;
  }
}
