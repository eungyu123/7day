const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //_id
    nickname: { type: String, required: true },
    nicknameEdit: { type: Boolean }, // 추가
    friendList: [{ freind_id: { type: String } }],
    googleId: { type: String, required: true },
    userPoint: { type: Number, required: true },
    character: { type: String },
    pet: { type: String },
    petList: [{ petId: { type: String } }],
    characterList: [{ characterId: { type: String } }],
    eggList: [{ eggId: { type: String } }],
    rewardList: [{ rewardId: { type: String } }],
    // 변경
    gifts: [
      {
        gift: { type: String, required: true },
        reward: { type: Number, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    ],
    // 추가
    lastGiftsGeneratedAt: { type: Date },

    // 추가  위치 정보 (GeoJSON 형식)
    location: {
      type: {
        type: String,
        enum: ["Point"], // 위치 타입 Point로 고정
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude] 경도, 위도
      },
    },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
