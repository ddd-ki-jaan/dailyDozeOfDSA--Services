import mongoose from "mongoose";
const Schema = mongoose.Schema;

const striver79SheetSchema = new Schema(
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

const Striver79Sheet = mongoose.model("Striver79Sheet", striver79SheetSchema);

export default Striver79Sheet;
