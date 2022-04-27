import { Field, ID, InputType, ObjectType } from "type-graphql";
import { TaskState } from "../../domain/state";
import { IEditTask, ITask } from "../../domain/task";
import { Timestamp } from "../../domain/types/timestamp";
import { Label } from "./labelSchema";
import { INewTask } from "./../../domain/task";

@ObjectType()
export class Task implements ITask {
  @Field((type) => ID)
  _id!: string;

  @Field()
  name!: string;

  @Field()
  state!: TaskState;

  @Field()
  projectId!: string;

  @Field((type) => [Label])
  labels!: Label[];

  @Field()
  creationTs!: Timestamp;

  @Field({ nullable: true })
  completionTs!: Timestamp;
}

@InputType()
export class NewTaskInput implements INewTask {
  @Field((type) => [String], { nullable: true })
  labels!: string[];

  @Field()
  name!: string;

  @Field()
  projectId!: string;
}

@InputType()
export class EditTaskInput implements IEditTask {
  @Field()
  projectId!: string;

  @Field()
  taskId!: string;

  @Field()
  name!: string;

  @Field()
  state!: TaskState;
}
