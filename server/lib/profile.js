const User = require("../db/models/User"); // require로 가져오기
const Reward = require("../db/models/Reward"); // require로 가져오기

module.exports = {
  profile: async (id, res) => {
    console.log("test");
    try {
      // DB에서 모든 유저 데이터를 가져오기
      const user = await User.findById(id);
      // DB에서 모든 보상 데이터를 가져오기
      const reward = await Reward.findOne({ user_id: id });

      // 모든 데이터를 포함하여 응답
      return res.status(200).json({
        user: user,
        reward: reward,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
};
