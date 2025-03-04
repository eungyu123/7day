const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema(
  {
    //_id
    userId: { type: String, required: true },
    enterpriseName: { type: String },
    content: { type: String },
    icon: { type: String },
  },
  { timestamps: true, collection: "rewards" }
);

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
