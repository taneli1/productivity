import { Service } from "typedi";
import { IEntry, IEntryService, INewEntry } from "../../domain/entry";
import Entry from "../../database/models/entryModel";

@Service()
export class EntryService implements IEntryService {
  async createEntry(userId: string, data: INewEntry): Promise<IEntry> {
    const entry = {
      createdAt: Date.now().toString(),
      taskId: data.taskId,
      timeInSeconds: data.timeInSeconds,
      userId,
    };

    return await Entry.create(entry);
  }

  async getAllTaskEntries(userId: string, taskId: string): Promise<IEntry[]> {
    return await Entry.find({ taskId: taskId, userId: userId });
  }
}
