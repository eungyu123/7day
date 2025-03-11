const models = require("../models/index");
const { Mission } = models;

module.exports = {
  createMission: async (req, res) => {
    const mission = new Mission(req.body);
    if (!mission) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    await mission.save();
    return mission;
  },
  getMissions: async (req, res) => {
    const missions = await Mission.find();
    if (!missions) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    return missions;
  },
  updateMission: async (req, res) => {
    const mission = await Mission.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!mission) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    return mission;
  },
  deleteMission: async (req, res) => {
    const result = await Mission.findOneAndDelete({ _id: req.params.userId });
    if (!result) {
      return res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    return { message: "Mission deleted" };
  },
};
