const mongoose = require("mongoose");
const { Egg, UserEgg } = require("../models/Egg"); // Egg, UserEgg 모델 가져오기

const userId = "67c7ab445f743adc8dc272a5"; // 랜덤한 유저 ID 생성

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

const deleteUserEgg = async () => {
  try {
    const userEggs = await UserEgg.find({ userId });
    await UserEgg.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};
const seedAll = async () => {
  await seedEggData();
};
module.exports = { seedAll };
