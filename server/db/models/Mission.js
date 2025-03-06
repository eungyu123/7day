const mongoose = require("mongoose");

const MissionSchema = new mongoose.Schema(
  {
    //_id
    missionContent: { type: String },
    missionGoal: { type: Number },
    missionName: { type: String },
    rewardId: { type: String },
  },
  { timestamps: true, collection: "missions" }
);

const Mission = mongoose.model("Mission", MissionSchema);

module.exports = Mission;
