import { Field, ID, InputType } from "type-graphql";
import { ObjectType } from "type-graphql/dist/decorators/ObjectType";
import { IEntry } from "../../domain/entry";
import { Timestamp } from "../../domain/types/timestamp";
import { INewEntry } from "./../../domain/entry";

@ObjectType()
export class Entry implements IEntry {
  @Field((type) => ID)
  _id!: string;

  @Field()
  userId!: string;

  @Field()
  taskId!: string;

  @Field()
  createdAt!: Timestamp;

  @Field()
  timeInSeconds!: number;
}

@InputType()
export class NewEntryInput implements INewEntry {
  @Field()
  taskId!: string;

  @Field()
  timeInSeconds!: number;
}
