import mongoose from "mongoose";
const Schema = mongoose.Schema;

const striverA2ZSheetStepSchema = new Schema(
  {
    step_no: {
      type: Number,
    },
    topic_name: {
      type: String,
    },
    sub_steps: [
      {
        type: Schema.Types.ObjectId,
        ref: "StriverA2ZSheetSubStep",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const StriverA2ZSheetStep = mongoose.model(
  "StriverA2ZSheetStep",
  striverA2ZSheetStepSchema
);

export default StriverA2ZSheetStep;
