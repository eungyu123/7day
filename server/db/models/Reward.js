const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema(
  {
    //_id
    user_id: { type: String, required: true },
    enterprise_name: { type: String },
    content: { type: String },
    icon: { type: String },
  },
  { timestamps: true, collection: "rewards" }
);

const Reward = mongoose.model("Reward", RewardSchema);

module.exports = Reward;
