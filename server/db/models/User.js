const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //_id
    nickname: { type: String, required: true },
    nicknameEdit: { type: Boolean }, // 추가
    googleId: { type: String, required: true },
    userPoint: { type: Number, required: true },
    pet: { type: String },
    character: { type: String },
    lastGiftsGeneratedAt: { type: Date },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // lng, lat 순서
      },
    },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
