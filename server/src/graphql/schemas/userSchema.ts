import { Field, ID, InputType, ObjectType } from "type-graphql";
import { ICredentials, IUser } from "../../domain/user";

@ObjectType()
export class User implements IUser {
  @Field((type) => ID)
  _id!: string;

  @Field()
  username!: string;

  @Field()
  creationDate!: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  token?: string;
}

@InputType()
export class UserCredentials implements ICredentials {
  @Field()
  username!: string;

  @Field()
  password!: string;
}
