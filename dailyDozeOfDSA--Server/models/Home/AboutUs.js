import mongoose from "mongoose";
import { Schema } from "mongoose";

const aboutUsSchema = new Schema(
    {
        serialNo: {
            type: Number,
        },
        title: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("AboutUs", aboutUsSchema);