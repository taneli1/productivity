import { Timestamp } from "./types/timestamp";

export interface IEntry {
  _id: string;
  taskId: string;
  createdAt: Timestamp;
  timeInSeconds: number;
}
