import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    githubId: {
      type: String,
      deafult: null,
    },
    githubUsername: {
      type: String,
      default: null,
    },
    profilePicUrl: {
      type: String,
      default: null,
    },
    sdeSheetsProblemStatus: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserProblemStatus",
      },
    ],
    userSocialProfiles: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
      },
    ],
    userCodingProfiles: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
      },
    ],
    savedNotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "SavedNote",
      },
    ],
    bookmarkedNotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "BookmarkedNote",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
