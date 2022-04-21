import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { confirmIsLabelOwner } from "../auth/authChecker";
import { CustomContext } from "../auth/context";
import { LabelService } from "../services/labelService";
import { Label, NewLabelInput } from "./../schemas/labelSchema";

@Service()
@Resolver((of) => Label)
export class LabelResolver {
  constructor(private labelService: LabelService) {}

  @Authorized()
  @UseMiddleware(confirmIsLabelOwner)
  @Query((returns) => Label)
  async getLabel(@Arg("id") id: string) {
    return await this.labelService.getLabel(id);
  }

  @Authorized()
  @Query((returns) => [Label])
  async getUserLabels(@Ctx() ctx: CustomContext) {
    return await this.labelService.getUserLabels(ctx.user._id);
  }

  @Authorized()
  @Mutation((returns) => Label)
  async createLabel(
    @Arg("data") data: NewLabelInput,
    @Ctx() ctx: CustomContext
  ) {
    return await this.labelService.createLabel(ctx.user._id, data);
  }

  @Authorized()
  @UseMiddleware(confirmIsLabelOwner)
  @Mutation((returns) => Label)
  async deleteLabel(@Arg("id") id: string) {
    return await this.labelService.deleteLabel(id);
  }
}
