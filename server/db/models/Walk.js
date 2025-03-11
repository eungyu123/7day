const mongoose = require("mongoose");

const WalkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    steps: { type: Number },
    date: { type: Date }, // 시간 정보는 필요없기때문에 String 사용
  },
  { timestamps: true, collection: "walkdatas" }
);
WalkSchema.index({ userId: 1, date: 1 }, { unique: true });

const Walk = mongoose.model("Walk", WalkSchema);

module.exports = Walk;
