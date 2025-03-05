const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    //_id
    logdate: { type: Date },
    logType: { type: String },
    logContent: { type: String },
  },
  { timestamps: true, collection: "logs" }
);
