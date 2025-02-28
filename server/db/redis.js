// redisClient.js
// const Redis = require("ioredis");

// const redis = new Redis(); // Redis 인스턴스 생성

// redis.on("connect", () => console.log("✅ Redis 연결됨!"));
// redis.on("error", (err) => console.error("❌ Redis 오류:", err));

// module.exports = redis;

// 레디스 문법
// async function testRedis() {
//   try {
//     // 1️⃣ 데이터 저장 (SET)
//     await redis.set("user:123", "John");
//     console.log("✅ 데이터 저장 완료!");

//     // 2️⃣ 데이터 조회 (GET)
//     const value = await redis.get("user:123");
//     console.log("🎯 저장된 값:", value); // "John" 출력

//     // 3️⃣ 키 존재 여부 확인 (EXISTS)
//     const exists = await redis.exists("user:123");
//     console.log("🔍 키 존재 여부:", exists ? "존재함" : "존재하지 않음");

//     // 4️⃣ 키 삭제 (DEL)
//     await redis.del("user:123");
//     console.log("🗑️ 키 삭제 완료!");

//     // 5️⃣ 삭제 후 키 존재 여부 재확인
//     const existsAfterDelete = await redis.exists("user:123");
//     console.log("🚫 삭제 후 키 존재 여부:", existsAfterDelete ? "존재함" : "존재하지 않음");

//     // Redis 연결 종료
//     redis.quit();
//   } catch (error) {
//     console.error("❌ Redis 오류:", error);
//   }
// }
