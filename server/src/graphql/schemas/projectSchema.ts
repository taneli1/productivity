import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IEditProject, INewProject, IProject } from "../../domain/project";
import { ProjectState } from "../../domain/state";
import { Timestamp } from "../../domain/types/timestamp";
import { Task } from "./taskSchema";

@ObjectType()
export class Project implements IProject {
  @Field((type) => ID)
  _id!: string;

  @Field((type) => ID)
  userId!: string;

  @Field()
  name!: string;

  @Field()
  hex!: string;

  @Field()
  state!: ProjectState;

  @Field()
  creationDate!: Timestamp;

  @Field((type) => [Task], { nullable: true })
  tasks!: Task[];
}

@InputType()
export class NewProjectInput implements INewProject {
  @Field()
  name!: string;

  @Field()
  hex!: string;
}

@InputType()
export class EditProjectInput implements IEditProject {
  @Field()
  projectId!: string;

  @Field()
  name!: string;

  @Field()
  hex!: string;

  @Field()
  state!: ProjectState;
}
