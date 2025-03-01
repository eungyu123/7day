// 구글 로그인 + 닉네임 설정

const User = require("../db/models/User"); // require로 가져오기
const Reward = require("../db/models/Reward"); // require로 가져오기
const Inventory = require("../db/models/Inventory"); // require로 가져오기
const Walk = require("../db/models/WalkData"); // require로 가져오기

const kakaomap = require("../utils/kakaomap");
// const redis = require("../db/redis");

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
      return res.status(500).json({ error: "" });
    }
  },

  UpdateUser: async (req, res) => {
    try {
      const { googleId } = req.params;
      const { newUserName } = req.body;
      console.log(req.body);
      if (!newUserName) {
        return res
          .status(400)
          .json({ type: "error", message: " 닉네임이 입력되지않았습니다." });
      }
      const user = await User.findOne({ googleId });
      if (!user) {
        return res
          .status(404)
          .json({ type: "error", message: "유저를 찾을수 없습니다." });
      }
      user.nickname = newUserName;
      await user.save();
      res.status(200).json({
        type: "success",
        message: "닉네임이 성공적으로 변경되었습니다.",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ type: "error", message: "서버 오류" });
    }
  },
};
