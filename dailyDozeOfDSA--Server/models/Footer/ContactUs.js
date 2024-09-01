import mongoose from "mongoose";
import { Schema } from "mongoose";
import ContactUsStatusEnum from "../../enums/ContactUsStatusEnum.js";

const ContactUsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ContactUsStatusEnum,
        default: "PENDING",
    },
    remarks: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model("ContactUs", ContactUsSchema);