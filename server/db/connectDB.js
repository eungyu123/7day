const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://gudwns1423:gudwns10113@pedometer-db.hjqd5.mongodb.net/pedometer?retryWrites=true&w=majority&appName=pedometer-DB";

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
