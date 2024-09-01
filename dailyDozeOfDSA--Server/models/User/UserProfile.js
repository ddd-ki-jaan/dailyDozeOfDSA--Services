import mongoose from "mongoose";
import { Schema } from "mongoose";

const userProfileSchema = new Schema(
  {
    profileName: {
      type: String,
      required: true,
      enum: [
        "LINKEDIN",
        "GITHUB",
        "TWITTER",
        "YOUTUBE",
        "CODEFORCES",
        "CODECHEF",
        "LEETCODE",
        "HACKERRANK",
      ],
    },
    profileLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserProfile", userProfileSchema);
