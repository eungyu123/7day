const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://menteehubb:9jYyK3oSHNZEIYyk@pedometer-db.j1khp.mongodb.net/?retryWrites=true&w=majority&appName=pedometer-db";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
