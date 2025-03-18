const mongoose = require("mongoose");

const UserMissionSchema = new mongoose.Schema(
  {
    //_id
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    missionId: { type: mongoose.Schema.Types.ObjectId, ref: "Mission" }, // missionId를 ObjectId로 변경하고, 참조 설정
    success: { type: Boolean },
    getReward: { type: Boolean },
    completedAt: { type: Date },
  },
  { timestamps: true, collection: "usermissions" }
);

const UserMission = mongoose.model("UserMission", UserMissionSchema);

module.exports = UserMission;
