import mongoose from "mongoose";
import ProblemSheetNameEnum from "../../enums/ProblemSheetNameEnum.js";
import UserProblemStatusEnum from "../../enums/UserProblemStatusEnum.js";
const Schema = mongoose.Schema;

const userProblemStatus = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    problem: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    sheetName: {
      type: String,
      enum: ProblemSheetNameEnum,
      required: true,
    },
    problemStatus: {
      type: String,
      enum: UserProblemStatusEnum,
      default: "PENDING",
    },
    problemNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserProblemStatus", userProblemStatus);
