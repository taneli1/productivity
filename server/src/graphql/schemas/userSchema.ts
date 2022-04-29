import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Timestamp } from "../../domain/types/timestamp";
import { ICredentials, IUser } from "../../domain/user";

@ObjectType()
export class User implements IUser {
  @Field((type) => ID)
  _id!: string;

  @Field()
  username!: string;

  @Field()
  creationDate!: Timestamp;

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
