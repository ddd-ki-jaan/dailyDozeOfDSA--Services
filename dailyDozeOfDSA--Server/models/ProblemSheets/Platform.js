import mongoose from "mongoose";
const Schema = mongoose.Schema;
import CodingPlatformNameEnum from "../../enums/CodingPlatformNameEnum.js";

const platformSchema = new Schema(
  {
    platform_name: {
      type: String,
      // required: true,
      enum: CodingPlatformNameEnum,
    },
    platform_link: {
      type: String,
      required: true,
      default: "NA",
    },
  },
  {
    timestamps: true,
  }
);

const Platform = mongoose.model("Platform", platformSchema);

export default Platform;
