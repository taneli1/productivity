import { Context } from "apollo-server-core";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { CustomContext } from "../auth/context";
import { UserCredentials, User } from "../schemas/userSchema";
import { UserService } from "../services/userService";

@Service()
@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async login(
    @Arg("credentials") credentials: UserCredentials,
    @Ctx() ctx: CustomContext
  ) {
    return await this.userService.login(ctx.req, ctx.res, credentials);
  }

  @Authorized()
  @Query((returns) => User)
  async user(@Arg("id") id: string) {
    return await this.userService.getUserWithId(id);
  }

  @Mutation((returns) => User)
  async registerUser(
    @Arg("credentials") credentials: UserCredentials
  ): Promise<User> {
    return this.userService.createUser(credentials);
  }
}
