// 구글 로그인 + 닉네임 설정

const User = require("../db/models/User"); // require로 가져오기
const Reward = require("../db/models/Reward"); // require로 가져오기
const Inventory = require("../db/models/Inventory"); // require로 가져오기
const Walk = require("../db/models/WalkData"); // require로 가져오기

const kakaomap = require("../utils/kakaomap");
// const redis = require("../db/redis");

module.exports = {
  // Users 관련
  UpdateUserName: async (req, res) => {
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
      user.nicknameEdit = true;
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

  // WalkData 관련
  getWalkDataByGoogleId: async (req, res) => {
    try {
      const { googleId } = req.params;
      const walkdatas = await Walk.find({ googleId });
      if (!walkdatas) {
        return res
          .status(404)
          .json({ type: "error", message: "데이터를 찾을 수 없음" });
      }
      const result = walkdatas.map((walkdatas) => {
        return {
          steps: walkdatas.steps,
          date: walkdatas.date,
        };
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ type: "error", message: "서버 오류" });
    }
  },
  getWeekWalkDataByGoogleId: async (req, res) => {
    try {
      const { googleId } = req.params;
      const walkdatas = await Walk.find({ googleId });
      if (!walkdatas) {
        return res
          .status(404)
          .json({ type: "error", message: "데이터를 찾을 수 없음" });
      }
      const today = new Date();

      //prettier-ignore
      const result = Array(7) .fill().map((_,i) => {
          const currentDay = new Date(today); 
          currentDay.setDate(today.getDate() - i);
          const dateStr = currentDay.toISOString().split("T")[0]; 
          
          const walkData = walkdatas.find(walk => walk.date.toISOString().split("T")[0] === dateStr);

          return {
            steps: walkData.steps || 0 ,
            date: dateStr,
          };
        });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ type: "error", message: "서버 오류" });
    }
  },

  // 지도 관련
  updateUserCoord: async (req, res) => {
    try {
      const { googleId } = req.params;
      const { lng, lat } = req.body;

      const user = await User.findOne({ googleId });
      if (!user) {
        return res
          .status(404)
          .json({ type: "error", message: "데이터를 찾을 수 없음" });
      }

      user.location = {
        type: "Point",
        coordinates: [lng, lat],
      };

      const lastGeneratedAt = user.lastItemGeneratedAt
        ? new Date(user.lastItemGeneratedAt).getTime()
        : 0;
      const oneHourAgo = Date.now() - 60 * 60 * 1000; // 1시간 전 Date.now() ==  new Date().getTime()

      // 아이템을 생성한적이 없거나 생성한지 한시간이 지났으면
      if (lastGeneratedAt == 0 || lastGeneratedAt < oneHourAgo) {
        const items = await generateItems({ lat, lng, googleId });
        if (!items) {
          return res
            .status(404)
            .json({ type: "error", message: "데이터를 찾을 수 없음" });
        }
        user.lastItemGeneratedAt = new Date();
      }

      await user.save();
      return res.status(200).json({
        type: "success",
        message: "유저 좌표 업데이트 및 아이템 생성 완료",
      });
    } catch (error) {
      res.status(500).json({ type: "error", message: "서버 오류" });
    }
  },

  getItems: async (req, res) => {
    try {
      const { googleId } = req.params;
      const user = await User.findOne({ googleId });
      if (!user) {
        return res
          .status(404)
          .json({ type: "error", message: "데이터를 찾을 수 없습니다." });
      }

      const items = user.items || [];

      return res.status(200).json({ type: "success", items });
    } catch (error) {
      res.status(500).json({ type: "error", message: "서버 오류" });
    }
  },

  // 산책로 관련
};

async function generateItems({ lat, lng, googleId }) {
  const user = await User.findOne({ googleId });
  if (!user) return null;
  const count = 5;
  const items = new Array(count).fill(0).map(() => ({
    item: "item", // 생성하는 아이템
    reward: Math.floor(Math.random() * 5) + 1, // 1~5원 보상
    lat: lat + (Math.random() - 0.5) / 10, // -0.005 ~ +0.005
    lng: lng + (Math.random() - 0.5) / 10, // -0.005 ~ +0.005
  }));

  // 기존 아이템 전부 삭제하고 새로운 아이템으로 교체
  user.items = items;

  user.save();
  return items;
}
