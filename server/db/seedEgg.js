const mongoose = require("mongoose");
const { Egg, UserEgg, Hatchery } = require("./models/Egg"); // Egg, Hatchery 모델 가져오기

async function seedEggData() {
  try {
    await mongoose.connection.dropCollection("eggs").catch(() => {});
    await mongoose.connection.dropCollection("usereggs").catch(() => {});

    // 1️⃣ Egg 데이터 생성 (5개)
    const eggs = await Egg.insertMany([
      { EggType: "1", goalWalk: 10000, state: "incubating", petLink: "" },
      { EggType: "2", goalWalk: 15000, state: "incubating", petLink: "" },
      { EggType: "1", goalWalk: 20000, state: "incubating", petLink: "" },
      { EggType: "1", goalWalk: 25000, state: "incubating", petLink: "" },
      { EggType: "3", goalWalk: 30000, state: "incubating", petLink: "" },
    ]);

    console.log("🥚 Egg 데이터 삽입 완료:", eggs);

    // 2️⃣ UserEgg 데이터 생성 (랜덤하게 할당)
    const userId = "67c7ab335f743adc8dc272a3"; // 테스트할 유저 ID (변경 가능)

    const userEggs = eggs.map((egg) => ({
      userId,
      eggId: egg._id.toString(),
      eggName: egg.EggType.toString(),
      currentStep: Math.floor(Math.random()), // 랜덤한 현재 걸음 수
      goalWalk: egg.goalWalk,
    }));

    await UserEgg.insertMany(userEggs);
    console.log("👤 UserEgg 데이터 삽입 완료:", userEggs);
  } catch (error) {
    console.error("❌ 데이터 시드 중 오류 발생:", error);
  }
}

module.exports = { seedEggData };
