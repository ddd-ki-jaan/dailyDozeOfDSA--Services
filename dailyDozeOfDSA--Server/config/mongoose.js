import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const databaseURL = process.env.MONGODB_URL;

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(`MongoDB connection error: ${error}`);
  });

export default mongoose.connection;
