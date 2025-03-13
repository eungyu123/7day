const mongoose = require("mongoose");
const { Egg, UserEgg, Hatchery } = require("../models/Egg"); // Egg, UserEgg 모델 가져오기
const { Trail, UserTrail } = require("../models/Trail"); // 위에서 만든 모델 가져오기
const Reward = require("../models/Reward"); // Reward 모델 경로에 맞게 수정
const User = require("../models/User");
const Mission = require("../models/Mission");
const UserMission = require("../models/UserMission");
const userId = "67c7ab445f743adc8dc272a5"; // 랜덤한 유저 ID 생성

async function resetUser() {
  try {
    const user = await User.findById(userId);
    user.petList = [];
    user.rewardList = [];
    await user.save();
  } catch (error) {
    console.log(error);
  }
}
async function seedEggData() {
  try {
    await mongoose.connection.dropCollection("eggs").catch(() => {});
    await mongoose.connection.dropCollection("usereggs").catch(() => {});

    // 1️⃣ Egg 데이터 생성 (5개)
    const eggs = await Egg.insertMany([
      { eggType: "1", goalWalk: 10000, petLink: "" },
      { eggType: "2", goalWalk: 15000, petLink: "" },
      { eggType: "1", goalWalk: 20000, petLink: "" },
      { eggType: "1", goalWalk: 25000, petLink: "" },
      { eggType: "3", goalWalk: 30000, petLink: "" },
    ]);

    console.log("🥚 Egg 데이터 삽입 완료:", eggs);

    // 2️⃣ UserEgg 데이터 30개 생성
    await seedUserEggData(eggs);
  } catch (error) {
    console.error("❌ 데이터 시드 중 오류 발생:", error);
  }
}

async function seedUserEggData(eggs) {
  try {
    await UserEgg.deleteMany({});
    const userEggs = [];

    for (let i = 0; i < 30; i++) {
      const randomEgg = eggs[Math.floor(Math.random() * eggs.length)]; // 랜덤한 Egg 선택

      userEggs.push({
        userId: userId.toString(),
        eggId: randomEgg._id.toString(),
        eggType: randomEgg.eggType,
        currentStep: 0, // 0
        goalWalk: randomEgg.goalWalk,
        state: "unhatched",
        petLink: "",
      });
    }

    await UserEgg.insertMany(userEggs);
    console.log("👤 UserEgg 데이터 30개 삽입 완료:", userEggs);
  } catch (error) {
    console.error("❌ UserEgg 데이터 시드 중 오류 발생:", error);
  }
}

// 임의의 산책로 데이터 추가
async function seedTrailData() {
  await Trail.deleteMany({});
  await UserTrail.deleteMany({});

  const trails = await Trail.insertMany([
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
  const userId = "67c7ab445f743adc8dc272a5"; // 실제 문자열 ID 사용

  const userTrailPromises = trails.map(async (savedTrail) => {
    const userTrail = new UserTrail({
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
  console.log("🚀 유저 산책로 저장 완료:", savedUserTrails);
}

async function seedRandomHatcheries() {
  const result = await Hatchery.deleteMany({});
  // 서울의 위도, 경도 범위
  const latRange = [37.4138, 37.7159]; // 위도 범위
  const lngRange = [126.7341, 127.2682]; // 경도 범위

  // 30개의 랜덤한 Hatchery 데이터 생성
  const hatcheries = [];

  for (let i = 0; i < 8; i++) {
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
  console.log("🏠 부화장 15개 저장 완료:", savedHatcheries);
}

async function seedReward() {
  await Reward.deleteMany({});
  console.log(" 리워드 데이터 삭제");

  try {
    const rewards = [
      {
        enterpriseName: "버거킹",
        content: "2000원 할인권",
        image: "burgerking.png",
      },
      {
        enterpriseName: "CU",
        content: "10000원 쿠폰",
        image: "CU10000.png",
      },
      {
        enterpriseName: "롯데리아",
        content: "쉬림프 버거 세트",
        image: "lotteria-shimpburger.png",
      },
      {
        enterpriseName: "GS25",
        content: "포스틱",
        image: "postic.png",
      },
      {
        enterpriseName: "스타벅스",
        content: "아메리카노 조각케이크 세트",
        image: "starbucks.png",
      },
    ];
    const insertedRewards = await Reward.insertMany(rewards);
    console.log(insertedRewards);
  } catch (error) {
    console.error(error);
  }
}

const insertMission = async () => {
  try {
    const insertedRewards = await Reward.find();
    // 미션 데이터 삽입 전에 rewardId를 동적으로 할당

    const missionDummyData = [
      {
        missionContent: "하루 10,000보 걷기",
        missionGoal: 10000,
        missionName: "만보 챌린지",
      },
      {
        missionContent: "5km 러닝 완료",
        missionGoal: 5000,
        missionName: "러닝 마스터",
      },
      {
        missionContent: "3일 연속 운동하기",
        missionGoal: 3,
        missionName: "꾸준함의 힘",
      },
      {
        missionContent: "일주일 연속 출석하기",
        missionGoal: 7,
        missionName: "출석 챌린지",
      },
      {
        missionContent: "하루 200kcal 소모하기",
        missionGoal: 200,
        missionName: "칼로리 소모",
      },
    ];

    const updatedMissionData = missionDummyData.map((mission, i) => ({
      ...mission,
      rewardId: insertedRewards[i % insertedRewards.length]._id || null,
    }));
    console.log("업데이트된 미션 데이터:", updatedMissionData);

    // 미션 데이터 삽입
    await Mission.deleteMany({});
    const insertedMissions = await Mission.insertMany(updatedMissionData);
    console.log("✅ 미션 데이터 삽입 완료!");

    for (let i = 0; i < insertedMissions.length; i++) {
      const mission = await Mission.findById(insertedMissions[i]._id)
        .populate("rewardId", "content") // rewardId 필드를 populate하여 content를 가져옵니다.
        .exec();

      console.log(`Mission ${mission._id}:`, mission);
      console.log(
        `Mission ${mission._id}: Reward Content - ${mission.rewardId.content}`
      );
    }
    console.log(insertedMissions);

    const removeum = await UserMission.deleteMany({});
    console.log("삭제 (seedAll) ", removeum);
  } catch (error) {
    console.error("❌ 미션 데이터 삽입 중 오류 발생:", error);
    throw error; // 오류 발생 시 예외 처리
  }
};

const seedAll = async () => {
  await seedEggData();
  await seedTrailData();
  await seedReward();
  await resetUser();
  await insertMission();
};

module.exports = { seedAll };

const landmarkDes =
  "올림픽 세계평화의 문은 서울시 송파구 올림픽공원 입구에 소재한 지하 1층, 지상 4층, 연면적 3,120㎡의 철골철근콘크리트조 건물이다. 1986년 설계해서 1988년 9월 12일 준공했으나, 김중업은 준공 4개월을 앞둔 5월 11일에 작고해 완성된 모습을 보지 못했다. ";
