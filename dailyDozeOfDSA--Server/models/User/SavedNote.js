import mongoose from "mongoose";
import { Schema } from "mongoose";

const savedNoteSchema = new Schema(
  {
    note: {
      type: Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },
    isSaved: {
      type: Boolean,
      default: false,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SavedNote", savedNoteSchema);
