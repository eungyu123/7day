const mongoose = require("mongoose");

// 산책로 명소 마커 스키마
const LandmarkSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 명소 이름
  image: { type: String },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  }, // 명소 위치 (위도, 경도)
});

// 산책로 스키마
const TrailSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 산책로 이름
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  }, // 산책로 좌표 (위도, 경도)
  distance: { type: String },
  image: { type: String }, // 산책로 이미지 URL
  landmarks: [LandmarkSchema], // 명소 마커 배열
});

// 유저 산책 기록 스키마
const UserTrailSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // 유저 ID (String)
  trailId: {
    type: String,
    required: true,
  }, // 산책로 ID (String, Trail 모델 참조)
  visitedLandmarks: [
    {
      landmarkId: { type: String }, // 명소 ID (String, Landmark 모델 참조)
      name: { type: String, required: true }, // 명소 이름
      image: { type: String },
      location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      }, // 명소 위치 (위도, 경도)
      visited: { type: Boolean, default: false },
    },
  ], // 방문한 명소 체크
});

// 모델 생성
const Trail = mongoose.model("Trail", TrailSchema);
const UserTrail = mongoose.model("UserTrail", UserTrailSchema);

module.exports = { Trail, UserTrail };
