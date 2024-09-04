import mongoose from "mongoose";
const Schema = mongoose.Schema;

const loveBabbar450DSASheetSchema = new Schema(
  {
    topic_no: {
      type: Number,
    },
    topic_name: {
      type: String,
    },
    problems: [
      {
        type: Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const LoveBabbar450DSASheet = mongoose.model(
  "LoveBabbar450DSASheet",
  loveBabbar450DSASheetSchema
);

export default LoveBabbar450DSASheet;
