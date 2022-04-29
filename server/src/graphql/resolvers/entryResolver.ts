import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { CustomContext } from "../auth/context";
import { EntryService } from "../services/entryService";
import { Entry, NewEntryInput } from "./../schemas/entrySchema";

@Service()
@Resolver((of) => Entry)
export class EntryResolver {
  constructor(private entryService: EntryService) {}

  @Authorized()
  @Mutation((returns) => Entry)
  async createEntry(
    @Arg("data") data: NewEntryInput,
    @Ctx() context: CustomContext
  ) {
    return await this.entryService.createEntry(context.user._id, data);
  }

  @Authorized()
  @Query((returns) => [Entry])
  async getTaskEntries(@Arg("id") id: string, @Ctx() context: CustomContext) {
    return await this.entryService.getAllTaskEntries(context.user._id, id);
  }
}
