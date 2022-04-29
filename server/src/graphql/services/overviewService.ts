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
    const taskIds = (await Task.find({ projectId: { $in: ids } }).lean()).map(
      (it) => it._id
    );
    const entries = await this.getEntriesForTasks(taskIds, from, to);
    const totals = calculateTotals(entries);
    const overview: IOverview = {
      from: from,
      to: to,
      tasksCompleted: totals.count,
      totalTimeInSeconds: totals.seconds,
    };

    return overview;
  }

  private async getEntriesForTasks(
    taskIds: string[],
    from: Timestamp,
    to: Timestamp
  ): Promise<IEntry[]> {
    return await Entry.find({
      taskId: { $in: taskIds },
      createdAt: { $gt: from, $lt: to },
    }).lean();
  }
}

const calculateTotals = (
  entries: IEntry[]
): { count: number; seconds: number } => {
  return {
    count: entries.length,
    seconds: entries
      .map((prev, curr) => prev.timeInSeconds)
      .reduce((prev, curr) => prev + curr, 0),
  };
};
