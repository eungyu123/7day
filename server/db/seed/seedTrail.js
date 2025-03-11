const mongoose = require("mongoose");
const models = require("../models/index");
const { User, Egg, UserEgg } = require("../models/index"); // Egg, UserEgg 모델 가져오기

// 임의의 산책로 데이터 추가
async function createSampleData1() {
  await mongoose.connection.dropCollection("trails"); // 'trails' 컬렉션 삭제
  await mongoose.connection.dropCollection("usertrails"); // 'usertrails' 컬렉션 삭제
  await mongoose.connection.dropCollection("landmarks"); // 'usertrails' 컬렉션 삭제
  // 1️⃣ 산책로 추가

  const trails = await models.Trail.insertMany([
    {
      name: "올림픽공원",
      location: { lat: 37.5207, lng: 127.1235 },
      image: "OlympicPark.jpg",
      address: "서울 특별시 강동구",
      distance: "3km",
      landmarks: [
        {
          name: "세계 평화의 문",
          image: "OlympicPark1.jpg",
          description: landmarkDes,
          location: { lat: 37.5189, lng: 127.1226 },
        },
        {
          name: "나홀로 나무",
          image: "OlympicPark2.jpg",
          description: landmarkDes,
          location: { lat: 37.5203, lng: 127.1268 },
        },
        {
          name: "올림픽 호수",
          image: "OlympicPark3.jpg",
          description: landmarkDes,
          location: { lat: 37.5218, lng: 127.1247 },
        },
      ],
    },
    {
      name: "봉화산 둘레길",
      location: { lat: 37.6175, lng: 127.0923 },
      image: "bonghwasan-dule-gil.jpg",
      address: "서울 특별시 강동구",
      distance: "7.5km",
      landmarks: [
        {
          name: "봉화산 정상",
          image: "bonghwasan-dule-gil1.jpg",
          description: landmarkDes,
          location: { lat: 37.6204, lng: 127.0952 },
        },
        {
          name: "둘레길 입구",
          image: "bonghwasan-dule-gil2.jpg",
          description: landmarkDes,
          location: { lat: 37.6152, lng: 127.0895 },
        },
      ],
    },
    {
      name: "몽촌토성",
      location: { lat: 37.5195, lng: 127.1186 },
      image: "mongchontoseong-fortress.jpg",
      address: "서울 특별시 강동구",
      distance: "2.5km",
      landmarks: [
        {
          name: "몽촌호",
          image: "mongchontoseong-fortress1.jpg",
          description: landmarkDes,
          location: { lat: 37.5192, lng: 127.1165 },
        },
      ],
    },
    {
      name: "서울 둘레길 4코스",
      location: { lat: 37.5512, lng: 127.0075 },
      image: "seoul-trail-section4.jpg",
      address: "서울 특별시 강동구",
      distance: "10km",
      landmarks: [
        {
          name: "남산골 한옥마을",
          image: "seoul-trail-section4_1.jpg",
          description: landmarkDes,
          location: { lat: 37.5532, lng: 127.0026 },
        },
        {
          name: "한강 전망대",
          image: "seoul-trail-section4_2.jpg",
          description: landmarkDes,
          location: { lat: 37.5442, lng: 127.0131 },
        },
      ],
    },
  ]);

  console.log("🚀 산책로 저장 완료:", trails);

  // 2️⃣ 유저 산책 기록 추가
  const userId = "67c7ab335f743adc8dc272a3"; // 실제 문자열 ID 사용

  const userTrailPromises = trails.map(async (savedTrail) => {
    const userTrail = new models.UserTrail({
      userId,
      trailId: savedTrail._id.toString(),
      visitedLandmarks: savedTrail.landmarks.map((landmark) => ({
        landmarkId: landmark._id,
        name: landmark.name,
        image: landmark.image,
        description: landmark.description,
        location: landmark.location,
        visited: false,
      })),
    });

    return userTrail.save();
  });

  const savedUserTrails = await Promise.all(userTrailPromises);
  console.log("🚀 산책로 저장 완료:", savedUserTrails);
}

const Reward = require("../models/Reward"); // Reward 모델 경로에 맞게 수정

async function seedReward() {
  await Reward.deleteMany({});
  console.log(" 리워드 데이터 삭제");

  try {
    const rewards = [
      {
        enterpriseName: "burgerking",
        content: "2000원 할인권",
        image: "burgerking.png",
      },
      {
        enterpriseName: "CU",
        content: "1000원 쿠폰",
        image: "CU.png",
      },
      {
        enterpriseName: "lotteria",
        content: "감자튀김",
        image: "lotteria.png",
      },
    ];

    const newrewards = await Reward.create(rewards);
    console.log(newrewards);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createSampleData1,
  seedReward,
};

const landmarkDes =
  "올림픽 세계평화의 문은 서울시 송파구 올림픽공원 입구에 소재한 지하 1층, 지상 4층, 연면적 3,120㎡의 철골철근콘크리트조 건물이다. 1986년 설계해서 1988년 9월 12일 준공했으나, 김중업은 준공 4개월을 앞둔 5월 11일에 작고해 완성된 모습을 보지 못했다. ";
