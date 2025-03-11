// 구글 로그인 + 닉네임 설정

const { createUser } = require("../db/controllers/UserController"); // require로 가져오기
const { createWalkData } = require("../db/controllers/WalkDataController");
const models = require("../db/models");
const { Trail, UserTrail, Landmark } = models;
const { handleDatabaseError, handleServerError } = require("../utils/utils");

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
      const reward = await models.Reward.findById(rewardId);
      if (!reward) return handleDatabaseError(req, res);

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
      const userRewards = await models.UserReward.find({ userId }).populate(
        "rewardId"
      );
      if (!userRewards) {
        handleDatabaseError(req, res);
      }

      return res.json({ type: "success", data: userRewards });
    } catch (error) {
      return res.status(500).json({ type: "error", message: error.message });
    }
  },
};
