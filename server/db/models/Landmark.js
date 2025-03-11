const mongoose = require("mongoose");

const LandmarkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // 명소 이름
    image: { type: String },
    description: { type: String },
    address: { type: String },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    trailId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trail",
      required: true,
    },
  },
  { timestamps: true, collection: "landmarks" }
);

LandmarkSchema.index({ location: "2dsphere" }); // 지리공간 인덱스 설정

const Landmark = mongoose.model("Landmark", LandmarkSchema);

module.exports = Landmark;
