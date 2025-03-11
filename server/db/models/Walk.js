const mongoose = require("mongoose");

const WalkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    steps: { type: Number },
    date: { type: Date },
  },
  { timestamps: true, collection: "walkdatas" }
);

const Walk = mongoose.model("Walk", WalkSchema);

module.exports = Walk;
