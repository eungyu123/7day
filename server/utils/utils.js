const crypto = require("crypto");

const secretKey = crypto.randomBytes(16).toString("hex"); // 16비트 키 생성
console.log("🔑 비밀 키:", secretKey);
