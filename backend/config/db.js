import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  await mongoose
    .connect(mongoDB_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
};
