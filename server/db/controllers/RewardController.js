const Reward = require("../models/Reward");

module.exports = {
  createReward: async (req, res) => {
    const reward = new Reward(req.body);
    await reward.save();
    return reward;
  },
  getRewards: async (req, res) => {
    const rewards = await Reward.find();
    return rewards;
  },
  getReward: async (rewardId, res) => {
    const reward = await Reward.findOne({ _id: rewardId });
    return reward;
  },
  updateReward: async (req, res) => {
    const reward = await Reward.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return reward;
  },
  deleteReward: async (req, res) => {
    await Reward.findOneAndDelete({ _id: req.params.userId });
    return { message: "Reward deleted" };
  },
};
