const mongoose = require("mongoose");

const EggSchema = new mongoose.Schema(
  {
    EggType: { type: String, required: true },
    goalWalk: { type: Number, required: true }, // 목표 걸음 수
    state: { type: String, required: true }, // 상태 (e.g., "incubating", "hatched")
    petLink: { type: String }, // 부화 시 연결된 펫
  },
  { timestamps: true, collection: "eggs" }
);

const Egg = mongoose.model("Egg", EggSchema);

const UserEggSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    eggId: { type: String, required: true }, // 보유한 Egg ID
    EggName: { type: String, required: true },
    currentStep: { type: Number, default: 0 }, // 현재 걸음 수
    goalWalk: { type: Number }, // 목표 걸음 수
  },
  { timestamps: true, collection: "usereggs" }
);

const UserEgg = mongoose.model("UserEgg", UserEggSchema);

const HatcherySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // 부화장 이름
    location: {
      type: { type: String, default: "Point" }, // GeoJSON Point 타입
      coordinates: { type: [Number] }, // [경도, 위도] 형식
    },
  },
  { timestamps: true, collection: "Hatcheries" }
);

const Hatchery = mongoose.model("Hatchery", HatcherySchema);

module.exports = { Egg, UserEgg, Hatchery };
