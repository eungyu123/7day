// 더미 데이터 삽입
const mongoose = require("mongoose");
const WalkData = require("../models/WalkData"); // WalkDataSchema가 정의된 파일

// 사용자 ID (예시: '67c7ab335f743adc8dc272a3')
const userId = "67c7ab335f743adc8dc272a3";

// 2025년 3월 1일의 날짜
const date = new Date("2025-03-01"); // Date 객체로 생성

// 랜덤 걸음 수 (4000 ~ 12000 사이)
const steps = Math.floor(Math.random() * (12000 - 4000 + 1)) + 4000;

// WalkData 문서 생성
const walkData = new WalkData({
  userId: userId,
  steps: steps,
  date: date,
});

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
