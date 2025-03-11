const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //_id
    nickname: { type: String, required: true },
    nicknameEdit: { type: Boolean }, // 추가
    googleId: { type: String, required: true },
    userPoint: { type: Number, required: true },
    lastGiftsGeneratedAt: { type: Date },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
