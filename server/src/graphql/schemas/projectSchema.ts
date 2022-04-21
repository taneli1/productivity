import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IEditProject, INewProject, IProject } from "../../domain/project";
import { State } from "../../domain/state";

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
  state!: State;

  @Field()
  creationDate!: string;
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
  state!: State;
}
