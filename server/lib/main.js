const User = require("../db/models/User"); // require로 가져오기
const Reward = require("../db/models/reward"); // require로 가져오기
const Inventory = require("../db/models/Inventory"); // require로 가져오기
const Walk = require("../db/models/walk_data"); // require로 가져오기
module.exports = {
  test: async (req, res) => {
    console.log("test");
    try {
      // DB에서 모든 유저 데이터를 가져오기
      const users = await User.find();
      // DB에서 모든 보상 데이터를 가져오기
      const rewards = await Reward.find();
      // DB에서 모든 인벤토리 데이터를 가져오기
      const inventories = await Inventory.find();
      // DB에서 모든 걸음 데이터를 가져오기
      const walks = await Walk.find();

      // 모든 데이터를 포함하여 응답
      return res.status(200).json({
        users,
        rewards,
        inventories,
        walks,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
};
