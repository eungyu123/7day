const mongoose = require("mongoose");

const UserMissionSchema = new mongoose.Schema(
  {
    //_id
    userId: { type: String },
    missionId: { type: String },
    state: { type: String },
    completedAt: { type: Date },
    rewardId: { type: String },
  },
  { timestamps: true, collection: "usermissions" }
);
