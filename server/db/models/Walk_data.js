const mongoose = require("mongoose");

const WalkSchema = new mongoose.Schema(
  {
    //_id
    user_id: { type: String, required: true },
    steps: { type: Number },
    date: { type: Date },
  },
  { timestamps: true }
);

const Walk = mongoose.model("Walk_data", WalkSchema);

module.exports = Walk;
