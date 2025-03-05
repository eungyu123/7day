// 구글 로그인 + 닉네임 설정

const { createUser } = require("../db/controllers/UserController"); // require로 가져오기
const { createWalkData } = require("../db/controllers/WalkDataController");

const kakaomap = require("../utils/kakaomap");
// const redis = require("../db/redis");

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = await createUser(req, res);
      const now = new Date();
      req.params.id = user._id;
      req.body.date = now.toLocaleDateString("ko-KR");
      const walkData = await createWalkData(req, res);
      res.status(200).json({
        type: "success",
        message: "database created",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching create failed",
      });
    }
  },
};
