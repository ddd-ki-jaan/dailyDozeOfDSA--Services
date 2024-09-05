import mongoose from "mongoose";
const { Schema } = mongoose;

const mediaSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    encoding: {
      type: String,
    },
    filesize: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    collection_source: {
      type: String,
      enum: ["ENGINEERING_NOTES", "JOBS", "COMPANIES", "STATIC_DATA"],
      default: "STATIC_DATA",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);