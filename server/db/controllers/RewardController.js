const Reward = require("../models/Reward");

exports.createReward = async (req, res) => {
  const reward = new Reward(req.body);
  await reward.save();
  return reward;
};

exports.getRewards = async (req, res) => {
  const rewards = await Reward.find();
  return rewards;
};
