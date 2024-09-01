import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blind75DSASheetSchema = new Schema(
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

const Blind75DSASheet = mongoose.model(
  "Blind75DSASheet",
  blind75DSASheetSchema
);

export default Blind75DSASheet;
