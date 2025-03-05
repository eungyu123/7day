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
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return userMission;
  },
  deleteUserMission: async (req, res) => {
    await UserMission.findOneAndDelete({ _id: req.params.id });
    return { message: "UserMission deleted" };
  },
};
