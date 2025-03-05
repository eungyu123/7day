const Mission = require("../models/Mission");

module.exports = {
  createMission: async (req, res) => {
    const mission = new Mission(req.body);
    await mission.save();
    return mission;
  },
  getMissions: async (req, res) => {
    const missions = await Mission.find();
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
    return mission;
  },
  deleteMission: async (req, res) => {
    await Mission.findOneAndDelete({ _id: req.params.userId });
    return { message: "Mission deleted" };
  },
};
