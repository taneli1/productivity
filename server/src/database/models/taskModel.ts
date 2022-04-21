import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { ITask } from "./../../domain/task";
import { TaskState } from "../../domain/state";

const taskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  state: {
    type: String,
    enum: Object.values(TaskState),
    default: TaskState.TODO,
    required: true,
  },
  labels: [mongoose.Schema.Types.ObjectId],
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
  creationTs: { type: String, required: true },
  completionTs: { type: String },
});

export default model<ITask>("Task", taskSchema);
