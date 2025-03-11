const mongoose = require("mongoose");
const { User, Egg, UserEgg } = require("../models/index"); // Egg, UserEgg 모델 가져오기
const models = require("../models/index");

let userId;

async function deleteAll() {
  for (let modelName in models) {
    const model = models[modelName];
    const log = await model.deleteMany({});
    console.log(model, log);
  }
}

async function seedUser() {
  try {
    await models.User.deleteMany({});

    const newUser = new models.User({
      nickname: "testUser",
      nicknameEdit: false,
      googleId: "google-12345",
      userPoint: 10000,
      lastGiftsGeneratedAt: new Date(),
      location: {
        lat: 37.1234,
        lng: 127.0345,
      },
    });

    const savedUser = await newUser.save();
    userId = savedUser._id;

    console.log("유저 데이터 삽입");
  } catch (error) {
    console.error("Error inserting user:", error);
  }
}

async function insertWalkData() {
  try {
    const startDate = new Date("2025-03-1");
    const endDate = new Date("2025-03-11");

    const walkDataArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      walkDataArray.push({
        userId,
        steps: Math.floor(Math.random() * (10000 + 1)),
        date: new Date(currentDate).toISOString().split("T")[0],
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const savedWalkData = await models.Walk.insertMany(walkDataArray);
    console.log("🚀 걸음 수 데이터 저장 완료:");
  } catch (error) {
    console.error("❌ 데이터 삽입 중 오류 발생:", error);
  }
}

async function seedReward() {
  await models.Reward.deleteMany({});

  try {
    const rewards = [
      {
        enterpriseName: "버거킹",
        content: "2000원 할인권",
        image: "burgerking.png",
      },
      {
        enterpriseName: "CU",
        content: "1000원 쿠폰",
        image: "CU.png",
      },
      {
        enterpriseName: "롯데리아",
        content: "1000원 쿠폰",
        image: "lotteria.png",
      },
    ];

    const newrewards = await models.Reward.insertMany(rewards);
  } catch (error) {
    console.error(error);
  }
}

async function seedUserReward() {
  await models.UserReward.deleteMany({});

  try {
    const rewards = await models.Reward.find();
    const userRewards = rewards.map((reward) => {
      return { userId, rewardId: reward._id };
    });
    await models.UserReward.insertMany(userRewards);
  } catch (error) {
    console.log(error);
  }
}

async function seedTrail() {
  try {
    await models.Trail.deleteMany({});
    await models.UserTrail.deleteMany({});
    await models.Landmark.deleteMany({});
    const trailsData = [
      {
        name: "올림픽공원",
        address: "서울 특별시 강동구",
        distance: "3km",
        image: "OlympicPark.jpg",
        location: { lat: 37.5207, lng: 127.1235 },
      },
      {
        name: "봉화산 둘레길",
        address: "서울 특별시 강동구",
        distance: "7.5km",
        image: "bonghwasan-dule-gil.jpg",
        location: { lat: 37.6175, lng: 127.0923 },
      },
      {
        name: "몽촌토성",
        address: "서울 특별시 강동구",
        image: "mongchontoseong-fortress.jpg",
        distance: "2.5km",
        location: { lat: 37.5195, lng: 127.1186 },
      },
      {
        name: "서울 둘레길 4코스",
        address: "서울 특별시 강동구",
        image: "seoul-trail-section4.jpg",
        distance: "10km",
        location: { lat: 37.5512, lng: 127.0075 },
      },
    ];

    const trails = await models.Trail.insertMany(trailsData);
    console.log("🚀 산책로 저장 완료:");

    const landmarksData = [
      {
        name: "세계 평화의 문",
        image: "OlympicPark1.jpg",
        description: landmarkDes,
        location: { lat: 37.5189, lng: 127.1226 },
        trailId: trails[0]._id,
      },
      {
        name: "나홀로 나무",
        image: "OlympicPark2.jpg",
        description: landmarkDes,
        location: { lat: 37.5203, lng: 127.1268 },
        trailId: trails[0]._id,
      },
      {
        name: "올림픽 호수",
        image: "OlympicPark3.jpg",
        description: landmarkDes,
        location: { lat: 37.5218, lng: 127.1247 },
        trailId: trails[0]._id,
      },
      {
        name: "봉화산 정상",
        image: "bonghwasan-dule-gil1.jpg",
        description: landmarkDes,
        location: { lat: 37.6204, lng: 127.0952 },
        trailId: trails[1]._id,
      },
      {
        name: "둘레길 입구",
        image: "bonghwasan-dule-gil2.jpg",
        description: landmarkDes,
        location: { lat: 37.6152, lng: 127.0895 },
        trailId: trails[1]._id,
      },
      {
        name: "몽촌호",
        image: "mongchontoseong-fortress1.jpg",
        description: landmarkDes,
        location: { lat: 37.5192, lng: 127.1165 },
        trailId: trails[2]._id,
      },
      {
        name: "남산골 한옥마을",
        image: "seoul-trail-section4_1.jpg",
        description: landmarkDes,
        location: { lat: 37.5532, lng: 127.0026 },
        trailId: trails[3]._id,
      },
      {
        name: "한강 전망대",
        image: "seoul-trail-section4_2.jpg",
        description: landmarkDes,
        location: { lat: 37.5442, lng: 127.0131 },
        trailId: trails[3]._id,
      },
    ];

    const landmarks = await models.Landmark.insertMany(landmarksData);
    console.log("🚀 명소 저장 완료:");

    const userTrailsData = trails.map((trail) => ({
      userId,
      trailId: trail._id,
      visitedLandmarks: landmarks
        .filter(
          (landmark) => landmark.trailId.toString() === trail._id.toString()
        )
        .map((landmark) => ({ landmarkId: landmark._id, visited: false })),
    }));

    const userTrails = await models.UserTrail.insertMany(userTrailsData);
    console.log("🚀 유저 산책 기록 저장 완료:");
  } catch (error) {
    console.error("❌ 데이터 시딩 중 오류 발생:", error);
  }
}

async function seedEggData() {
  try {
    await models.Egg.deleteMany({});
    await models.UserEgg.deleteMany({});

    // 1️⃣ Egg 데이터 생성 (5개)
    const eggs = await Egg.insertMany([
      { eggType: "1", goalWalk: 10000, petLink: "" },
      { eggType: "2", goalWalk: 15000, petLink: "" },
      { eggType: "1", goalWalk: 20000, petLink: "" },
      { eggType: "1", goalWalk: 25000, petLink: "" },
      { eggType: "3", goalWalk: 30000, petLink: "" },
    ]);

    console.log("🥚 Egg 데이터 삽입 완료:");

    // 2️⃣ UserEgg 데이터 30개 생성
    async function seedUserEggData(eggs) {
      try {
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
        console.log("👤 UserEgg 데이터 30개 삽입 완료:");
      } catch (error) {
        console.error("❌ UserEgg 데이터 시드 중 오류 발생:", error);
      }
    }

    await seedUserEggData(eggs);
  } catch (error) {
    console.error("❌ 데이터 시드 중 오류 발생:", error);
  }
}

async function checkIndex() {
  await mongoose.connection.asPromise();
  const trailsIndexes = await mongoose.connection.db
    .collection("trails")
    .indexes();
  console.log(trailsIndexes);

  // const collectiontrails = mongoose.connection.db.collection("trails");
  // collectiontrails.dropIndex("location_2dsphere");

  const usertrailsIndexes = await mongoose.connection.db
    .collection("usertrails")
    .indexes();
  console.log(usertrailsIndexes);

  // const collectionusertrails =
  //   mongoose.connection.db.collection("usertrails");
  // collectionusertrails.dropIndex("location_2dsphere");

  const landmarksIndexes = await mongoose.connection.db
    .collection("landmarks")
    .indexes();
  console.log(landmarksIndexes);
  // const collectionlandmarks = mongoose.connection.db.collection("landmarks");
  // collectionlandmarks.dropIndex("location_2dsphere");
}

async function seedAll() {
  try {
    await seedUser();
    await insertWalkData();
    await seedReward();
    await seedUserReward();
    await seedTrail();
    await seedEggData();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { seedAll, deleteAll, checkIndex };

const landmarkDes =
  "올림픽 세계평화의 문은 서울시 송파구 올림픽공원 입구에 소재한 지하 1층, 지상 4층, 연면적 3,120㎡의 철골철근콘크리트조 건물이다. 1986년 설계해서 1988년 9월 12일 준공했으나, 김중업은 준공 4개월을 앞둔 5월 11일에 작고해 완성된 모습을 보지 못했다. ";
