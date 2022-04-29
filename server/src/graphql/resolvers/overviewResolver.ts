import {
  Arg,
  Authorized,
  Ctx,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { OverviewService } from "../services/overviewService";
import { Overview } from "./../schemas/overviewSchema";
import { CustomContext } from "./../auth/context";
import { confirmIsProjectOwner } from "../auth/authChecker";
import { Timestamp } from "../../domain/types/timestamp";

@Service()
@Resolver((of) => Overview)
export class OverviewResolver {
  constructor(private overviewService: OverviewService) {}

  @Authorized()
  @Query((returns) => Overview)
  async getTimeframeOverview(
    @Arg("from") from: Timestamp,
    @Arg("to") to: Timestamp,
    @Ctx() ctx: CustomContext
  ) {
    return await this.overviewService.queryTimeframe(ctx.user._id, from, to);
  }

  @Authorized()
  @UseMiddleware(confirmIsProjectOwner)
  @Query((returns) => Overview)
  async getProjectOverview(
    @Arg("projectId") projectId: string,
    @Arg("from") from: Timestamp,
    @Arg("to") to: Timestamp,
    @Ctx() ctx: CustomContext
  ) {
    return await this.overviewService.queryProjectTimeFrame(
      projectId,
      from,
      to
    );
  }
}
