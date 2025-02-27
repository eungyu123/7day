// 구글 로그인 + 닉네임 설정

const User = require("../db/models/User"); // require로 가져오기
const Reward = require("../db/models/reward"); // require로 가져오기
const Inventory = require("../db/models/Inventory"); // require로 가져오기
const Walk = require("../db/models/walk_data"); // require로 가져오기

const kakaomap = require("../utils/kakaomap");
const redis = require("../db/redis");

module.exports = {
  getUsers: async (req, res) => {
    try {
      // DB에서 모든 유저 데이터를 가져오기
      const users = await User.find();
      // 모든 데이터를 포함하여 응답
      console.log(users);
      return res.status(200).json({
        users,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
};
