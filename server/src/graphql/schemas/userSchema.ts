import { Field, ID, InputType, ObjectType } from "type-graphql";
import { INewUser, IUser } from "../../domain/user";

@ObjectType()
export class User implements IUser {
  @Field((type) => ID)
  id!: string;

  @Field()
  username!: string;

  @Field()
  password!: string;

  @Field()
  creationDate!: string;
}

@InputType()
export class NewUserInput implements INewUser {
  @Field()
  username!: string;

  @Field()
  password!: string;
}
