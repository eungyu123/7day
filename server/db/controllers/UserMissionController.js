const UserMission = require("../models/UserMission");
const Mission = require("../models/Mission");

module.exports = {
  createUserMission: async (req, res) => {
    const userId = req.params.userId;
    const Missions = await Mission.find();
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
    return userMissions;
  },
  updateUserMission: async (req, res) => {
    const userMission = await UserMission.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, upsert: true }
    );
    return userMission;
  },
  deleteUserMission: async (req, res) => {
    await UserMission.findOneAndDelete({ userId: req.params.userId });
    return { message: "UserMission deleted" };
  },
};
