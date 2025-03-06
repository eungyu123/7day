const mongoose = require("mongoose");

const WalkSchema = new mongoose.Schema(
  {
    //_id
    userId: { type: String, required: true },
    steps: { type: Number },
    date: { type: Date },
  },
  { timestamps: true, collection: "walkdatas" }
);

const Walk = mongoose.model("WalkData", WalkSchema);

module.exports = Walk;
