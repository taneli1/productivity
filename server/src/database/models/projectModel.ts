import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { IProject } from "../../domain/project";
import { State } from "../../domain/state";

const projectSchema = new Schema<IProject>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  hex: { type: String, required: true },
  creationDate: { type: String, required: true },
  state: {
    type: String,
    enum: Object.values(State),
    default: State.ONGOING,
    required: true,
  },
});

export default model<IProject>("Project", projectSchema);
