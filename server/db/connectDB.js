const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://menteehubb:zPw5HzlAC3bSqKqR@cluster0.j1khp.mongodb.net/blog";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
