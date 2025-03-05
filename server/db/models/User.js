const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //_id
    nickname: { type: String, required: true },
    nicknameEdit: { type: Boolean }, // 추가
    friendList: [{ freind_id: { type: String } }],
    googleId: { type: String, required: true },
    userPoint: { type: Number, required: true },
    pet: { type: String },
    petList: [{ petId: { type: String } }],
    character: { type: String },
    characterList: [{ characterId: { type: String } }],
    eggList: [{ eggId: { type: String } }],
    rewardList: [{ rewardId: { type: String } }],
    gifts: [
      {
        gift: { type: String, required: true },
        reward: { type: Number, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    ],
    lastGiftsGeneratedAt: { type: Date },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
