import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { NewUserInput, User } from "../schemas/userSchema";
import { UserService } from "../services/userService";

@Service()
@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async user(@Arg("id") id: string) {
    return await this.userService.getUserWithId(id);
  }

  @Mutation((returns) => User)
  async registerUser(
    @Arg("credentials") credentials: NewUserInput
  ): Promise<User> {
    return this.userService.createUser(credentials);
  }
}
