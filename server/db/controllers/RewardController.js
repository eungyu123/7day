const models = require("../models/index");
const { Reward } = models;

module.exports = {
  createReward: async (req, res) => {
    const reward = new Reward(req.body);
    await reward.save();
    return reward;
  },
  getRewards: async (req, res) => {
    const rewards = await Reward.find();
    if (!rewards) {
      return res.status(400).json({
        type: "error",
        message: "Reward searching failed",
      });
    }
    return rewards;
  },
  getReward: async (rewardId, res) => {
    const reward = await Reward.findOne({ _id: rewardId });
    if (!reward) {
      return res.status(400).json({
        type: "error",
        message: "Reward searching failed",
      });
    }
    return reward;
  },
  updateReward: async (req, res) => {
    const reward = await Reward.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!reward) {
      return res.status(400).json({
        type: "error",
        message: "Reward searching failed",
      });
    }
    return reward;
  },
  deleteReward: async (req, res) => {
    const result = await Reward.findOneAndDelete({ _id: req.params.userId });
    if (!result) {
      return res.status(400).json({
        type: "error",
        message: "Reward searching failed",
      });
    }
    return { message: "Reward deleted" };
  },
};
