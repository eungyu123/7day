const UserMission = require("../models/UserMission");
const Mission = require("../models/Mission");

module.exports = {
  createUserMission: async (req, res) => {
    const userId = req.params.userId;
    //미션 찾기
    const Missions = await Mission.find();
    //에러 처리
    if (!Missions) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    //미션들과 유저 결합하기
    const userMissions = await Promise.all(
      Missions.map(async (mission) => {
        const userMission = new UserMission({
          userId: userId,
          missionId: mission._id,
          state: "incomplete",
          completedAt: null,
          rewardId: mission.rewardId,
        });
        return await userMission.save();
      })
    );

    return userMissions;
  },
  getUserMissions: async (req, res) => {
    const userMissions = await UserMission.find();
    //유저미션 찾기 실패
    if (!userMissions) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    return userMissions;
  },
  updateUserMission: async (req, res) => {
    const userMission = await UserMission.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    );
    if (!userMission) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    return userMission;
  },
  deleteUserMission: async (req, res) => {
    const result = await UserMission.findOneAndDelete({
      userId: req.params.userId,
    });
    if (!result) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    return { message: "UserMission deleted" };
  },
};
