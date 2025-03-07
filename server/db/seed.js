const mongoose = require("mongoose");
const { Trail, UserTrail } = require("./models/Trail"); // 위에서 만든 모델 가져오기
const { Egg, Hatchery } = require("./models/Egg"); // Egg, Hatchery 모델 가져오기

// 임의의 산책로 데이터 추가
async function createSampleData1() {
  await mongoose.connection.dropCollection("trails"); // 'trails' 컬렉션 삭제
  await mongoose.connection.dropCollection("usertrails"); // 'usertrails' 컬렉션 삭제
  // 1️⃣ 산책로 추가

  const trails = await Trail.insertMany([
    {
      name: "올림픽공원",
      location: { lat: 37.5207, lng: 127.1235 },
      image: "OlympicPark.jpg",
      distance: "3km",
      landmarks: [
        {
          name: "세계 평화의 문",
          image: "OlympicPark1.jpg",
          location: { lat: 37.5189, lng: 127.1226 },
        },
        {
          name: "나홀로 나무",
          image: "OlympicPark2.jpg",
          location: { lat: 37.5203, lng: 127.1268 },
        },
        {
          name: "올림픽 호수",
          image: "OlympicPark3.jpg",
          location: { lat: 37.5218, lng: 127.1247 },
        },
      ],
    },
    {
      name: "봉화산 둘레길",
      location: { lat: 37.6175, lng: 127.0923 },
      image: "bonghwasan-dule-gil.jpg",

      distance: "7.5km",
      landmarks: [
        {
          name: "봉화산 정상",
          image: "bonghwasan-dule-gil1.jpg",
          location: { lat: 37.6204, lng: 127.0952 },
        },
        {
          name: "둘레길 입구",
          image: "bonghwasan-dule-gil2.jpg",
          location: { lat: 37.6152, lng: 127.0895 },
        },
      ],
    },
    {
      name: "몽촌토성",
      location: { lat: 37.5195, lng: 127.1186 },
      image: "mongchontoseong-fortress.jpg",
      distance: "2.5km",
      landmarks: [
        {
          name: "몽촌호",
          image: "mongchontoseong-fortress1.jpg",
          location: { lat: 37.5192, lng: 127.1165 },
        },
      ],
    },
    {
      name: "서울 둘레길 4코스",
      location: { lat: 37.5512, lng: 127.0075 },
      image: "seoul-trail-section4.jpg",
      distance: "10km",
      landmarks: [
        {
          name: "남산골 한옥마을",
          image: "seoul-trail-section4_1.jpg",
          location: { lat: 37.5532, lng: 127.0026 },
        },
        {
          name: "한강 전망대",
          image: "seoul-trail-section4_2.jpg",
          location: { lat: 37.5442, lng: 127.0131 },
        },
      ],
    },
  ]);

  console.log("🚀 산책로 저장 완료:", trails);

  // 2️⃣ 유저 산책 기록 추가
  const userId = "67c7ab335f743adc8dc272a3"; // 실제 문자열 ID 사용

  const userTrailPromises = trails.map(async (savedTrail) => {
    const userTrail = new UserTrail({
      userId,
      trailId: savedTrail._id.toString(),
      visitedLandmarks: savedTrail.landmarks.map((landmark) => ({
        landmarkId: landmark._id,
        name: landmark.name,
        image: landmark.image,
        location: landmark.location,
        visited: false,
      })),
    });

    return userTrail.save();
  });

  const savedUserTrails = await Promise.all(userTrailPromises);
  console.log("🚀 산책로 저장 완료:", savedUserTrails);
}

async function createRandomHatcheries() {
  await mongoose.connection.dropCollection("hatcheries");
  // 서울의 위도, 경도 범위
  const latRange = [37.4138, 37.7159]; // 위도 범위
  const lngRange = [126.7341, 127.2682]; // 경도 범위

  // 30개의 랜덤한 Hatchery 데이터 생성
  const hatcheries = [];

  for (let i = 0; i < 30; i++) {
    const randomLat = Math.random() * (latRange[1] - latRange[0]) + latRange[0]; // 랜덤 위도 생성
    const randomLng = Math.random() * (lngRange[1] - lngRange[0]) + lngRange[0]; // 랜덤 경도 생성

    const hatchery = new Hatchery({
      name: `서울 부화장 ${i + 1}`, // 부화장 이름
      location: {
        type: "Point", // GeoJSON Point 타입
        coordinates: [randomLng, randomLat], // 랜덤으로 생성된 경도, 위도
      },
    });

    hatcheries.push(hatchery); // 배열에 추가
  }

  // Hatchery 데이터들 저장
  const savedHatcheries = await Hatchery.insertMany(hatcheries);
  console.log("🏠 부화장 30개 저장 완료:", savedHatcheries);
}

module.exports = {
  createSampleData1,
  createRandomHatcheries,
};
