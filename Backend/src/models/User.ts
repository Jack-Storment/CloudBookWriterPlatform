import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "Author" | "Collaborator";
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Author", "Collaborator"], required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);
