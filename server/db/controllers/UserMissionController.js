const UserMission = require("../models/UserMission");

module.exports = {
  createUserMission: async (req, res) => {
    const userMission = new UserMission(req.body);
    await userMission.save();
    return userMission;
  },
  getUserMissions: async (req, res) => {
    const userMissions = await UserMission.find();
    return userMissions;
  },
  updateUserMission: async (req, res) => {
    const userMission = await UserMission.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    );
    return userMission;
  },
  deleteUserMission: async (req, res) => {
    await UserMission.findOneAndDelete({ userId: req.params.userId });
    return { message: "UserMission deleted" };
  },
};
