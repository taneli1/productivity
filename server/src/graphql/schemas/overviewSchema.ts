import { Field, ObjectType } from "type-graphql";
import { IOverview } from "../../domain/overview";
import { Timestamp } from "../../domain/types/timestamp";

@ObjectType()
export class Overview implements IOverview {
  @Field()
  from!: Timestamp;

  @Field()
  to!: Timestamp;

  @Field()
  tasksCompleted!: number;

  @Field()
  totalTimeInSeconds!: number;
}
