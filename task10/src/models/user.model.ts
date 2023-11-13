import { Schema, model } from "mongoose";
import { UserEntity } from "../entities/user.entity";

const userSchema = new Schema<UserEntity>({
  id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User = model<UserEntity>("User", userSchema);

export default User;
