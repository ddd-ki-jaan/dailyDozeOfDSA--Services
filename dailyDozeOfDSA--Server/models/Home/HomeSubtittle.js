import mongoose from "mongoose";
import { Schema } from "mongoose";

const homeSubtittleSchema = new Schema(
    {
        subTittle: {
            type: String,
            required: true,
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: "Media",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("HomeSubtittle", homeSubtittleSchema);