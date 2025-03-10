const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //_id
    nickname: { type: String, required: true },
    nicknameEdit: { type: Boolean }, // 추가
    friendList: [{ friend_id: { type: String } }],
    googleId: { type: String, required: true },
    userPoint: { type: Number, required: true },
    pet: { type: String },
    petList: [
      {
        petId: { type: String, required: true },
        petName: { type: String, required: true },
        price: { type: Number, required: true },
        petLink: { type: String, required: true },
      },
    ],
    character: { type: String },
    characterList: [
      {
        characterId: { type: String, required: true },
        characterName: { type: String, required: true },
        price: { type: Number, required: true },
        characterLink: { type: String, required: true },
      },
    ],
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
        type: [Number], // lng, lat 순서
      },
    },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
