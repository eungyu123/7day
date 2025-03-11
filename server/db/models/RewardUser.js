const mongoose = require("mongoose");

const UserRewardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rewardId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, collection: "userrewards" }
);

const UserReward = mongoose.model("UserReward", UserRewardSchema);

module.exports = UserReward;
