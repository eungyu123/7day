const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //_id
    nickname: { type: String, required: true },
    nicknameEdit: { type: Boolean },
    friendList: [{ freind_id: { type: String } }],
    userPoint: { type: Number, required: true },
    googleId: { type: String, required: true },
    lastItemGeneratedAt: { type: Date, default: Date.now },
    items: [
      {
        item: { type: String, required: true },
        reward: { type: Number, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    ],
    // 위치 정보 (GeoJSON 형식)
    location: {
      type: {
        type: String,
        enum: ["Point"], // 위치 타입 Point로 고정
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude] 경도, 위도
        required: false,
      },
    },
  },
  { timestamps: true, collection: "users" }
);

UserSchema.index({ location: "2dsphere" }); // 위치 기반 검색 효율적으로 함

const User = mongoose.model("users", UserSchema);

module.exports = User;
