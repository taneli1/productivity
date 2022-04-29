import { Schema, model } from "mongoose";
import { IUser } from "../../domain/user";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creationDate: { type: Number, required: true },
});

export default model<IUser>("User", userSchema);
