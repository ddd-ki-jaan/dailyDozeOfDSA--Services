import mongoose from "mongoose";
const Schema = mongoose.Schema;

const apnaCollegeDSASheetSchema = new Schema(
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

const ApnaCollegeDSASheet = mongoose.model(
  "ApnaCollegeDSASheet",
  apnaCollegeDSASheetSchema
);

export default ApnaCollegeDSASheet;
