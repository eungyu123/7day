// 더미 데이터 삽입
const Mission = require("../models/Mission"); // Mission 모델을 불러옴
const Reward = require("../models/Reward"); // Reward 모델을 불러옴
const UserMission = require("../models/UserMission");
const User = require("../models/User");
const mongoose = require("mongoose");
const WalkData = require("../models/WalkData"); // WalkDataSchema가 정의된 파일
// // 더미 데이터 삽입
// const mongoose = require("mongoose");
// const WalkData = require("../models/WalkData"); // WalkDataSchema가 정의된 파일

// // 사용자 ID (예시: '67c7ab335f743adc8dc272a3')
// const userId = "67c7ab335f743adc8dc272a3";

// // 2025년 3월 1일의 날짜
// const date = new Date("2025-03-01"); // Date 객체로 생성

// // 랜덤 걸음 수 (4000 ~ 12000 사이)
// const steps = Math.floor(Math.random() * (12000 - 4000 + 1)) + 4000;

// // WalkData 문서 생성
// const walkData = new WalkData({
//   userId: userId,
//   steps: steps,
//   date: date,
// });

// mongoose
//   .connect(
//     "mongodb+srv://gudwns1423:gudwns10113@pedometer-db.hjqd5.mongodb.net/pedometer?retryWrites=true&w=majority&appName=pedometer-DB"
//   )
//   .then(async () => {
//     // 데이터 삽입
//     await walkData.save();
//     console.log("WalkData for 2025-03-01 inserted");
//     mongoose.connection.close(); // 연결 종료
//   })
//   .catch((err) => console.error(err));

mongoose
  .connect(
    "mongodb+srv://gudwns1423:gudwns10113@pedometer-db.hjqd5.mongodb.net/pedometer?retryWrites=true&w=majority&appName=pedometer-DB"
  )
  .then(async () => {
    // 데이터 삽입
    await walkData.save();
    console.log("WalkData for 2025-03-01 inserted");
    mongoose.connection.close(); // 연결 종료
  })
  .catch((err) => console.error(err));

// 더미 보상 데이터
const rewardDummyData = [
  {
    enterpriseName: "쿠폰",
    content: "아메리카노 무료 쿠폰",
    image: "☕",
  },
  {
    enterpriseName: "포인트",
    content: "10 포인트 획득",
    image: "💎",
  },
  {
    enterpriseName: "포인트",
    content: "15 포인트 획득",
    image: "💎",
  },
  {
    enterpriseName: "쿠폰",
    content: "싱글 레귤러 아이스크림",
    image: "🍦",
  },
  {
    enterpriseName: "알",
    content: "알 1개 획득",
    image: "🥚",
  },
];

const missionDummyData = [
  {
    missionContent: "하루 10,000보 걷기",
    missionGoal: 10000,
    missionName: "만보 챌린지",
    rewardId: null,
  },
  {
    missionContent: "5km 러닝 완료",
    missionGoal: 5000,
    missionName: "러닝 마스터",
    rewardId: null,
  },
  {
    missionContent: "3일 연속 운동하기",
    missionGoal: 3,
    missionName: "꾸준함의 힘",
    rewardId: null,
  },
  {
    missionContent: "일주일 연속 출석하기",
    missionGoal: 7,
    missionName: "출석 챌린지",
    rewardId: null,
  },
  {
    missionContent: "하루 200kcal 소모하기",
    missionGoal: 200,
    missionName: "칼로리 소모",
    rewardId: null,
  },
];

const walkDummyData = [
  {
    userId: "67c7ab445f743adc8dc272a5",
    steps: 5000,
    date: new Date().toISOString(),
  },
  {
    userId: "67c7ab4b5f743adc8dc272a7",
    steps: 12000,
    date: new Date().toISOString(),
  },
];

//걸음 수 추가
const insertWalkDummyData = async () => {
  try {
    const insertWalks = await WalkData.insertMany(walkDummyData);
    console.log("✅ 걸음 데이터 삽입 완료!");
  } catch (error) {
    console.error("❌ 걸음 데이터 삽입 중 오류 발생:", error);
  }
};

// 데이터베이스에 삽입하는 함수
const insertDummyData = async () => {
  try {
    const insertedRewards = await Reward.insertMany(rewardDummyData);
    console.log("✅ 보상 데이터 삽입 완료!");

    // 미션 데이터 삽입 전에 rewardId를 동적으로 할당
    for (let i = 0; i < missionDummyData.length; i++) {
      missionDummyData[i].rewardId =
        insertedRewards[i % insertedRewards.length]._id; // 순서대로 rewardId 할당
      console.log("rewardid", i, missionDummyData[i].rewardId);
    }

    // 미션 데이터 삽입
    const insertedMissions = await Mission.insertMany(missionDummyData);
    console.log("✅ 미션 데이터 삽입 완료!");

    for (let i = 0; i < insertedMissions.length; i++) {
      const mission = await Mission.findById(insertedMissions[i]._id)
        .populate("rewardId", "content") // rewardId 필드를 populate하여 content를 가져옵니다.
        .exec();

      console.log(
        `Mission ${mission._id}: Reward Content - ${mission.rewardId.content}`
      );
    }
  } catch (error) {
    console.error("❌ 데이터 삽입 중 오류 발생:", error);
  }
};

const deleteDummyData = async () => {
  try {
    // 모든 미션 데이터 삭제
    // await Mission.deleteMany({});
    // console.log("✅ 모든 미션 데이터 삭제 완료!");

    // 모든 리워드 데이터 삭제
    await Reward.deleteMany({});
    console.log("✅ 모든 리워드 데이터 삭제 완료!");
  } catch (error) {
    console.error("❌ 데이터 삭제 중 오류 발생:", error);
  }
};

//usermission delete
const deleteAllUserMissions = async () => {
  try {
    await UserMission.deleteMany({});
    console.log("✅ 모든 유저 미션 데이터 삭제 완료!");
  } catch (error) {
    console.error("UserMission을 삭제하는 데 실패:", error);
  }
};
const deleteAllFriendLists = async () => {
  try {
    await User.updateMany({}, { $set: { friendList: [] } });
    console.log("✅ 모든 친구리스트 삭제 완료!");
  } catch (error) {
    console.error("Friendlist 초기화 실패:", error);
  }
};

// 실행
module.exports = {
  deleteDummyData,
  insertDummyData,
  deleteAllUserMissions,
  deleteAllFriendLists,
  insertWalkDummyData,
};
