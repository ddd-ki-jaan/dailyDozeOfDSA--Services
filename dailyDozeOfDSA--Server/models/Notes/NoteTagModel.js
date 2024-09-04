import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    unique: true
  }
}, { timestamps: true });

export default mongoose.model("NoteTag", tagSchema);
