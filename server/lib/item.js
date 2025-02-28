const User = require("../db/models/User"); // require로 가져오기
const Inventory = require("../db/models/Inventory"); // require로 가져오기

module.exports = {
  profile: async (id, res) => {
    console.log("inventory test");
    try {
      // DB에서 모든 유저 데이터를 가져오기
      const user = await User.findById(id);
      // DB에서 모든 아이템(캐릭터, 펫) 데이터를 가져오기
      const item = await Reward.findOne({ user_id: id });

      // 모든 데이터를 포함하여 응답
      return res.status(200).json({
        user: user,
        item: item,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
};
