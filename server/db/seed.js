const mongoose = require("mongoose");
const { Trail, UserTrail } = require("./models/Trail"); // 위에서 만든 모델 가져오기
const { Egg, Hatchery } = require("./models/Egg"); // Egg, Hatchery 모델 가져오기

// 임의의 산책로 데이터 추가
async function createSampleData1() {
  await mongoose.connection.dropCollection("trails"); // 'trails' 컬렉션 삭제
  await mongoose.connection.dropCollection("usertrails"); // 'usertrails' 컬렉션 삭제
  // 1️⃣ 산책로 추가

  const trail = new Trail({
    name: "올림픽공원",
    location: { lat: 37.524, lng: 126.97 },
    image: "OlympicPark.jpg",
    landmarks: [
      { name: "한강 다리", location: { lat: 37.526, lng: 126.973 } },
      { name: "강변 벤치", location: { lat: 37.528, lng: 126.975 } },
    ],
  });

  const savedTrail = await trail.save();
  console.log("🚀 산책로 저장 완료:", savedTrail);

  // 2️⃣ 유저 산책 기록 추가
  const userId = "67c7ab335f743adc8dc272a3"; // 실제 문자열 ID 사용
  const userTrail = new UserTrail({
    userId,
    trailId: savedTrail._id.toString(), // trailId도 문자열로 변환
    visitedLandmarks: savedTrail.landmarks.map((landmark) => ({
      landmarkId: landmark._id, // landmarkId를 landmark.name으로 사용
      landmarkname: landmark.name, // landmarkname을 제대로 할당
      visited: Math.random() > 0.5, // 랜덤으로 방문 여부 설정
    })),
  });

  const savedUserTrail = await userTrail.save();
  console.log("✅ 유저 산책 기록 저장 완료:", savedUserTrail);

  mongoose.connection.close(); // DB 연결 종료
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
