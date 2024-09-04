import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookmarkedNoteSchema = new Schema(
  {
    note: {
      type: Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },
    bookmarkedPages: [
      {
        type: Schema.Types.ObjectId,
        ref: "BookmarkPageInfo",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookmarkedNote", bookmarkedNoteSchema);
