import mongoose from "mongoose";
const Schema = mongoose.Schema;

const striverA2ZSheetSubStepSchema = new Schema(
  {
    sub_step_no: {
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

const StriverA2ZSheetSubStep = mongoose.model(
  "StriverA2ZSheetSubStep",
  striverA2ZSheetSubStepSchema
);

export default StriverA2ZSheetSubStep;
