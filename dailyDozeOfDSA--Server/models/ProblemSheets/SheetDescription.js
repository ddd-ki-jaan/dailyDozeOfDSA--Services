import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import ProblemSheetNameEnum from '../../enums/ProblemSheetNameEnum.js';
import ProblemSheetAuthorEnum from '../../enums/ProblemSheetAuthorEnum.js';

const sheetDescription = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            enum: ProblemSheetAuthorEnum,
        },
        sheetName: {
            type: String,
            enum: ProblemSheetNameEnum,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('SheetDescription', sheetDescription);