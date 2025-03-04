// 구글 로그인 + 닉네임 설정

const UserController = require("../db/controllers/UserController"); // require로 가져오기
const WalkDataController = require("../db/controllers/WalkDataController");

const kakaomap = require("../utils/kakaomap");
// const redis = require("../db/redis");

module.exports = {
  getStepsMonth: async (req, res) => {
    try {
      // DB에서 해당 유저의 걸음 데이터를 가져오기
      const userWalk = await WalkDataController.getWalkData(req, res);
      if (!userWalk) {
        return res.status(400).json({ error: "Walk data not found" });
      }
      // 해당 유저의 걸음 데이터를 가져와서 응답
      return res.status(200).json({
        message: "Walk data fetched",
        walk: userWalk.walk,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
  removeUser: async (req, res) => {
    try {
      // DB에서 해당 유저 데이터를 삭제
      await UserController.deleteUser(req, res);
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.error("Error deleting data:", error);
      return res.status(500).json({ error: "Failed to delete data" });
    }
  },
  walkUpdate: async (user_id, walk, res) => {
    console.log("walkUpdate");
    try {
      // DB에서 해당 유저 데이터를 가져오기
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      // DB에서 해당 유저의 걸음 데이터를 가져오기
      const userWalk = await Walk.findOne({ user_id: user_id });
      if (!userWalk) {
        return res.status(400).json({ error: "Walk data not found" });
      }
      // 걸음 데이터 업데이트
      userWalk.walk = walk;
      await userWalk.save();
      // 모든 데이터를 포함하여 응답
      return res.status(200).json({
        message: "Walk updated",
        user: user,
      });
    } catch (error) {
      console.error("Error updating walk:", error);
      return res.status(500).json({ error: "Failed to update walk" });
    }
  },
};
