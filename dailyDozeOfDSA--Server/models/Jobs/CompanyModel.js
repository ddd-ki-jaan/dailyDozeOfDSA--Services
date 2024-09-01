import mongoose from "mongoose";
import { Schema } from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: Schema.Types.ObjectId,
      ref: "Media",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
