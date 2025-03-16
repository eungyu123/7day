const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    //_id
    userId: { type: String },
    logdate: { type: Date },
    logType: { type: String },
    logImage: { type: String },
    logContent: { type: String },
  },
  { timestamps: true, collection: "logs" }
);

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
