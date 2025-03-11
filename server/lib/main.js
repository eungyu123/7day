// 구글 로그인 + 닉네임 설정

const { createUser } = require("../db/controllers/UserController"); // require로 가져오기
const { createWalkData } = require("../db/controllers/WalkDataController");
const Reward = require("../db/models/Reward");
const User = require("../db/models/User");

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = await createUser(req, res);
      const now = new Date();
      req.params.userId = user._id;
      req.body.date = now.toLocaleDateString("ko-KR");
      const walkData = await createWalkData(req, res);
      res.status(200).json({
        type: "success",
        message: "database created",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching create failed",
      });
    }
  },

  getReward: async (req, res) => {
    try {
      const { rewardId } = req.body;
      const rewards = await Reward.find();
      console.log("rewardId", rewardId);

      console.log(rewards);
      const reward = await Reward.findById(rewardId);
      console.log("reward", reward);
      return res.json({ type: "success", data: reward });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        type: "error",
      });
    }
  },

  getRewards: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      const rewards = await Promise.all(
        user.rewardList.map((rewardId) => Reward.findById(rewardId))
      );

      // user.rewardList = [];
      // await user.save();
      return res.json({ type: "success", data: rewards });
    } catch (error) {
      return res.status(500).json({ type: "error", message: error.message });
    }
  },
};
