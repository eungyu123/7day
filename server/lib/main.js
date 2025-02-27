const User = require("../db/models/User"); // require로 가져오기

module.exports = {
  test: async (req, res) => {
    console.log("test");
    // ✅ DB에서 모든 유저 데이터를 가져오기
    const users = await User.find(); // MongoDB에서 users 컬렉션의 모든 데이터 조회

    return res.status(200).json({
      type: "success",
      data: users, // 조회한 데이터를 응답에 포함
    });
  },
};
