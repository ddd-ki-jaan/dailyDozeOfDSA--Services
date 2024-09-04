import mongoose, { Schema } from "mongoose";

const engNotesCategoryOptionModel = new Schema(
  {
    optionLabel: {
      type: String,
      required: true,
      unique: true,
    },
    optionValue: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "EngNotesCategoryOption",
  engNotesCategoryOptionModel
);
