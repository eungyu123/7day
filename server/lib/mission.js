const {
  getUserMissions,
  updateUserMission,
} = require("../db/controllers/UserMissionController");
const { getReward } = require("../db/controllers/RewardController");
module.exports = {
  getUserMission: async (req, res) => {
    try {
      const userMission = await getUserMission(req, res);
      res.status(200).json({
        type: "success",
        message: "UserMission found",
        data: userMission,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "UserMission fetch failed",
      });
    }
  },
  updateUserMission: async (req, res) => {
    try {
      const userMission = await updateUserMission(req, res);
      const rewardId = userMission.rewardId;
      const reward = await getReward(rewardId, res);
      res.status(200).json({
        type: "success",
        message: "UserMission updated",
        data: userMission,
        rewardId: rewardId,
        reward: reward,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "UserMission update failed",
      });
    }
  },
};
