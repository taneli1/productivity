import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { IProject } from "../../domain/project";
import { ProjectState } from "../../domain/state";

const projectSchema = new Schema<IProject>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  hex: { type: String, required: true },
  creationDate: { type: Number, required: true },
  state: {
    type: String,
    enum: Object.values(ProjectState),
    default: ProjectState.ONGOING,
    required: true,
  },
});

export default model<IProject>("Project", projectSchema);
