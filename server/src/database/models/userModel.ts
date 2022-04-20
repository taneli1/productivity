import { Schema, model } from "mongoose";
import { IUser } from "../../domain/user";
import mongoose from "mongoose";

const userSchema = new Schema<IUser>({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creationDate: { type: String, required: true },
});

export default model<IUser>("User", userSchema);
