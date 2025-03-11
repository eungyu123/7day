const mongoose = require("mongoose");

const UserEggSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eggId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Egg",
      required: true,
    }, // 보유한 Egg ID
    eggType: { type: String, required: true }, //  // 1,2,3 금, 은, 동
    currentStep: { type: Number, default: 0 }, // 현재 걸음 수
    goalWalk: { type: Number }, // 목표 걸음 수
    state: { type: String, required: true }, // 상태 (e.g., "unhatched", "hatching", "hatched")
    petLink: { type: String }, // 부화 시 연결된 펫
  },
  { timestamps: true, collection: "usereggs" }
);

const UserEgg = mongoose.model("UserEgg", UserEggSchema);

module.exports = UserEgg;
