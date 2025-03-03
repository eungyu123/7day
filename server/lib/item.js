const UserController = require("../db/controllers/UserController"); // require로 가져오기

module.exports = {
  getInventory: async (req, res) => {
    try {
      // DB에서 모든 보상 데이터를 가져오기
      const User = await UserController.getUser();
      const inventory = {
        character: User.character,
        pet: User.pet,
        egg: User.egg,
      };
      res.status(200).json(inventory);
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
};
