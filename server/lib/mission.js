const mongoose = require("mongoose");

const {
  getUserMission,
  updateUserMission,
  createUserMission,
} = require("../db/controllers/UserMissionController");
const models = require("../db/models");

module.exports = {
  getUserMission: async (req, res) => {
    try {
      console.log("getusermission 진입");
      await getUserMission(req, res);

      console.log("get 성공");
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "UserMission fetch failed",
      });
    }
  },

  finishMission: async (req, res) => {
    try {
      const { userId } = req.params;
      const { missionId, rewardId } = req.body;
      const missions = await UserMission.find();
      const userMission = await UserMission.findOne({ userId, missionId });
      userMission.getReward = true;
      await userMission.save();
      console.log("rewardId", rewardId);
      const reward = await Mission.findById(missionId);
      const user = await User.findById(userId);
      user.rewardList.push(rewardId.toString());
      await user.save();
      return res.status(200).json({ type: "success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ type: "error" });
    }
  },

  updateUserMission: async (req, res) => {
    try {
      console.log("updateusermission 진입");

      const userMission = await updateUserMission(req, res);
      // //const rewardId = userMission.rewardId;
      // const reward = await getReward(rewardId, res);
      console.log("updateusermission 컨트롤러 받음");
      res.status(200).json({
        type: "success",
        message: "UserMission updated",
        data: userMission,
        // rewardId: rewardId,
        // reward: reward,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "UserMission update failed",
      });
    }
  },

  createUserMission: async (req, res) => {
    try {
      console.log("createUser 진입");

      const userMission = await createUserMission(req, res);
      res.status(200).json({
        type: "success",
        message: "UserMission created",
        data: userMission,
      });
      console.log("create 성공");
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "UserMission creation failed",
      });
    }
  },
};
