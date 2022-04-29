import { Timestamp } from "./types/timestamp";
import { UserInput } from "./types/userInput";

export interface IEntry {
  _id: string;
  userId: string;
  taskId: string;
  createdAt: Timestamp;
  timeInSeconds: number;
}

export interface IEntryService {
  createEntry: (userId: string, data: INewEntry) => Promise<IEntry>;

  getAllTaskEntries: (userId: string, taskId: string) => Promise<IEntry[]>;
}

export interface INewEntry extends UserInput {
  taskId: string;
  timeInSeconds: number;
}
