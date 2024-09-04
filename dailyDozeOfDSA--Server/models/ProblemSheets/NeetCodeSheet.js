import mongoose from "mongoose";
const Schema = mongoose.Schema;

const neetCodeSheetSchema = new Schema(
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

const NeetCodeSheet = mongoose.model("NeetCodeSheet", neetCodeSheetSchema);

export default NeetCodeSheet;
