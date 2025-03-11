const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema(
  {
    enterpriseName: { type: String },
    content: { type: String },
    image: { type: String },
  },
  { timestamps: true, collection: "rewards" }
);

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
