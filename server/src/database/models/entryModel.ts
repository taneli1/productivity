import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { IEntry } from "../../domain/entry";

const entrySchema = new Schema<IEntry>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Number, required: true },
  timeInSeconds: { type: Number, required: true },
});

export default model<IEntry>("Entry", entrySchema);
