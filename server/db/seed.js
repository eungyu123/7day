const Walk = require("./models/WalkData");
const Inventory = require("./models/Inventory");
const Reward = require("./models/Reward");
const User = require("./models/User");

const googleId = "107700869954758960557";

const dummyWalks = [
  { date: "2025-03-01", step: 6947 },

  { date: "2025-02-18", step: 6947 },
  { date: "2025-02-19", step: 4061 },
  { date: "2025-02-20", step: 5932 },
  { date: "2025-02-21", step: 7967 },
  { date: "2025-02-22", step: 1401 },
  { date: "2025-02-23", step: 959 },
  { date: "2025-02-24", step: 4650 },
  { date: "2025-02-25", step: 5595 },
  { date: "2025-02-26", step: 6262 },
  { date: "2025-02-27", step: 2755 },
  { date: "2025-01-15", step: 2755 },
  { date: "2025-01-16", step: 2755 },
];

module.exports = {
  seedDummyWalks: async () => {
    // await Walk.deleteMany({}); // 데이터 전체 삭제
    const existedWalkdatas = await Walk.find({ googleId });
    if (existedWalkdatas.length == 0) {
      // 비동기 실행에서는 forEach문 사용금지
      for (const dummyWalk of dummyWalks) {
        const walk = new Walk({
          googleId: googleId,
          steps: dummyWalk.step,
          date: dummyWalk.date,
        });
        await walk.save();
      }
      console.log("dummyWalks 삽입 완료");
    } else {
      // console.log(existedWalkdatas);
      console.log("dummyWalks 이미 존재");
    }
  },
};
