const mongoose = require("mongoose");

const EggSchema = new mongoose.Schema(
  {
    eggType: { type: String, required: true }, // 1,2,3 금, 은, 동
    goalWalk: { type: Number, required: true }, // 목표 걸음 수
    petLink: { type: String }, // 부화 시 연결된 펫
  },
  { timestamps: true, collection: "eggs" }
);

const Egg = mongoose.model("Egg", EggSchema);

module.exports = Egg;
