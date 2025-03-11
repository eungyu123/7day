const mongoose = require("mongoose");

const TrailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // 산책로 이름
    address: { type: String },
    description: { type: String },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    distance: { type: String },
    image: { type: String }, // 산책로 이미지 URL
  },
  { timestamps: true, collection: "trails" }
);

const Trail = mongoose.model("Trail", TrailSchema);

module.exports = Trail;
