const User = require("../db/models/User"); // require로 가져오기

module.exports = {
  test: async (name, point, res) => {
    console.log("name");
    try {
      const existingUser = await User.findOne({ name: name });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      // DB에서 모든 유저 데이터를 가져오기
      const newUser = await User({
        nickname: name,
        user_point: point,
      });
      await newUser.save();

      //새로운 walk_data와 inventory, reward 생성
      const newWalk = await Walk({
        user_id: newUser._id,
        steps: 0,
        date: new Date(),
      });
      await newWalk.save();

      const newInventory = await Inventory({
        user_id: newUser._id,
        character: "",
        pet: "",
        egg: "",
      });
      await newInventory.save();

      const newReward = await Reward({
        user_id: newUser._id,
        content: "",
        icon: "",
        enterprise_name: "",
      });
      await newReward.save();
      // 유저정보를 포함하여 응답
      return res.status(200).json({
        message: "User created",
        user: newUser,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
};
