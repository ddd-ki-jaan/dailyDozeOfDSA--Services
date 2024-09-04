import mongoose from "mongoose";
import ProblemSheetNameEnum from "../../enums/ProblemSheetNameEnum.js";
const Schema = mongoose.Schema;

const problemSchema = new Schema(
  {
    problem_name: {
      type: String,
      required: true,
      default: "NA",
    },
    sheetName: {
      type: String,
      enum: ProblemSheetNameEnum,
      required: true,
    },
    practice_platform_links: [
      {
        type: Schema.Types.ObjectId,
        ref: "Platform",
      },
    ],
    solution_article_links: [
      {
        type: Schema.Types.ObjectId,
        ref: "Platform",
      },
    ],
    practice_solution_links: [
      {
        type: Schema.Types.ObjectId,
        ref: "Platform"
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
