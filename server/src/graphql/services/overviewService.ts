import { Service } from "typedi";
import { IOverview, IOverviewService } from "../../domain/overview";
import Project from "../../database/models/projectModel";
import Task from "../../database/models/taskModel";
import { ITask } from "../../domain/task";
import Entry from "../../database/models/entryModel";
import { IEntry } from "../../domain/entry";
import { Timestamp } from "../../domain/types/timestamp";

@Service()
export class OverviewService implements IOverviewService {
  async queryTimeframe(
    uid: string,
    from: Timestamp,
    to: Timestamp
  ): Promise<IOverview> {
    const userProjectIds = (await Project.find({ userId: uid }).lean()).map(
      (it) => it._id
    );
    return await this.getOverviewForProjectIds(userProjectIds, from, to);
  }

  async queryProjectTimeFrame(
    projectId: string,
    from: Timestamp,
    to: Timestamp
  ): Promise<IOverview> {
    return await this.getOverviewForProjectIds([projectId], from, to);
  }

  private async getOverviewForProjectIds(
    ids: string[],
    from: Timestamp,
    to: Timestamp
  ): Promise<IOverview> {
    console.log(from, to);
    const completedTasks = (
      await Task.find({
        projectId: { $in: ids },
        completionTs: { $gt: from, $lt: to },
      }).lean()
    ).map((it) => it._id);

    const tasksWithinTimeframe = await Task.find({
      projectId: { $in: ids },
      creationTs: { $gt: from, $lt: to },
    }).lean();

    const entriesInTimeframe = await this.getEntriesInTimeframe(from, to);
    const overview: IOverview = {
      from: from,
      to: to,
      tasksCompleted: completedTasks.length,
      totalTimeInSeconds: entriesInTimeframe
        .map((it) => it.timeInSeconds)
        .reduce((prev, curr) => prev + curr, 0),
      tasksWithinTimeframe,
    };

    return overview;
  }

  private async getEntriesInTimeframe(
    from: Timestamp,
    to: Timestamp
  ): Promise<IEntry[]> {
    return await Entry.find({
      createdAt: { $gt: from, $lt: to },
    }).lean();
  }
}
