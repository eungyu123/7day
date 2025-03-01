const mongoose = require("mongoose");

const WalkSchema = new mongoose.Schema(
  {
    //_id
    googleId: { type: String, required: true },
    steps: { type: Number },
    date: { type: Date, required: true },
  },
  { timestamps: true, collection: "walkdatas" }
);

// googleId, date 필드 조합에 대해 유니크 옵션 추가
WalkSchema.index({ googleId: 1, date: 1 }, { unique: true });

const Walk = mongoose.model("walkdatas", WalkSchema);

module.exports = Walk;
