import { Schema, model } from "mongoose";
import { ILabel } from "../../domain/label";
import mongoose from "mongoose";

const labelSchema = new Schema<ILabel>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  hex: { type: String, required: true },
});

export default model<ILabel>("Label", labelSchema);
