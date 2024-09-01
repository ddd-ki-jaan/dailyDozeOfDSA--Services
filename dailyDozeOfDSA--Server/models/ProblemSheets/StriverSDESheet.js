import mongoose from "mongoose";
const Schema = mongoose.Schema;

const striverSDESheetSchema = new Schema(
  {
    day_no: {
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

const StriverSDESheet = mongoose.model(
  "StriverSDESheet",
  striverSDESheetSchema
);

export default StriverSDESheet;
