const mongoose = require("mongoose");

const UserTrailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trailId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trail",
      required: true,
    },
    visitedLandmarks: [
      {
        landmarkId: { type: mongoose.Schema.Types.ObjectId, ref: "Landmark" }, // 명소 ID (참조)
        visited: { type: Boolean, default: false },
        visitedAt: { type: Date },
      },
    ],
  },
  { timestamps: true, collection: "usertrails" }
);

const UserTrail = mongoose.model("UserTrail", UserTrailSchema);

module.exports = UserTrail;
