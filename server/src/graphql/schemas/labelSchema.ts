import { Field, ID, InputType, ObjectType } from "type-graphql";
import { ILabel } from "../../domain/label";
import { INewLabel } from "./../../domain/label";

@ObjectType()
export class Label implements ILabel {
  @Field((type) => ID)
  _id!: string;

  @Field()
  userId!: string;

  @Field()
  name!: string;

  @Field()
  hex!: string;
}

@InputType()
export class NewLabelInput implements INewLabel {
  @Field()
  name!: string;

  @Field()
  hex!: string;
}
