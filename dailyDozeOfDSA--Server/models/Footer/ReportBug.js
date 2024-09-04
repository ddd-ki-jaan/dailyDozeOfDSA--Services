import mongoose from "mongoose";
import { Schema } from "mongoose";
import ReportBugStatusEnum from "../../enums/ReportBugStatusEnum.js";

const ReportBugSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    bugDescription: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ReportBugStatusEnum,
        default: "PENDING",
    },
    remarks: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model("ReportBug", ReportBugSchema);