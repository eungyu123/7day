const mongoose = require("mongoose");

const GiftSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    giftType: { type: String, required: true },
    point: { type: Number },
    eggId: { type: String },
    rewardId: { type: String },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { timestamps: true, collection: "gifts" }
);

const Gift = mongoose.model("Gift", GiftSchema);

module.exports = Gift;
