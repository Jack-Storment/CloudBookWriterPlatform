import mongoose, { Schema, Document } from "mongoose";

export interface ISection extends Document {
  name: string;
  subsections: ISection[];
  user: mongoose.Schema.Types.ObjectId;
}

const SectionSchema: Schema = new Schema({
  name: { type: String, required: true },
  subsections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Section = mongoose.model<ISection>("Section", SectionSchema);
