import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    noteTitle: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    noteTags: [
      {
        type: Schema.Types.ObjectId,
        ref: "NoteTag",
      },
    ],
    noteCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "EngNotesCategoryOption",
        required: true,
      },
    ],
    noteContent: {
      type: Schema.Types.ObjectId,
      ref: "Media",
      required: true,
    },
    uploadedBy: {
      type: String,
      default: "ADMIN",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
