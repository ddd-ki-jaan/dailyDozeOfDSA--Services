import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    unique: true
  }
}, { timestamps: true });

export default mongoose.model("NoteCategory", categorySchema);
