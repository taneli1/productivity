import { Field, ObjectType } from "type-graphql";
import { IOverview } from "../../domain/overview";
import { Timestamp } from "../../domain/types/timestamp";
import { Task } from "./taskSchema";

@ObjectType()
export class Overview implements IOverview {
  @Field()
  from!: Timestamp;

  @Field((type) => [Task])
  tasksWithinTimeframe!: Task[];

  @Field()
  to!: Timestamp;

  @Field()
  tasksCompleted!: number;

  @Field()
  totalTimeInSeconds!: number;
}
