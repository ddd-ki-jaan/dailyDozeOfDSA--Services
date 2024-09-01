import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookmarkPageInfoSchema = new Schema(
  {
    bookmarkName: {
      type: String,
      required: true,
    },
    bookmarkPageNumber: {
      type: Number,
      required: true,
    },
    isBookmarked: {
        type: Boolean,
        required: true,
        default: false,
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
  { timestamps: true }
);

export default mongoose.model("BookmarkPageInfo", bookmarkPageInfoSchema);
