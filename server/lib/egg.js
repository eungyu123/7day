const { Egg, UserEgg, Hatchery } = require("../db/models/Egg");
const User = require("../db/models/User");

module.exports = {
  getEgg: async (req, res) => {
    try {
      const { userId } = req.params;

      const userEggs = await UserEgg.find({ userId });

      if (!userEggs.length)
        return res.status(404).json({ message: "No eggs found for this user" });

      res.json({ type: "success", data: userEggs });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  updateEggState: async (req, res) => {
    try {
      const { userId } = req.params;
      const { eggId } = req.body;
      console.log(userId, eggId);

      const userEgg = await UserEgg.findById(eggId);

      await UserEgg.updateMany(
        { userId, state: "hatching", _id: { $ne: eggId } }, // eggId가 아닌 hatching 상태의 알들을 찾음
        { $set: { state: "unhatched" } } // hatching → idle 상태로 변경
      );

      if (userEgg.currentStep >= userEgg.goalWalk) {
        userEgg.state = "hatched";
      } else {
        userEgg.state = "hatching";
      }

      const updatedUserEgg = await userEgg.save();
      console.log(updatedUserEgg);
      res.json({
        type: "success",
        message: "Egg updated",
        data: updatedUserEgg,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  insertEgg: async (req, res) => {
    try {
      const { userId } = req.params;
      const { eggType } = req.body; // eggType
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  updateEgg: async (req, res) => {
    try {
      const { userId } = req.params;
      const { steps } = req.body;

      // currentStep 값 증가 + 업데이트
      const userEgg = await UserEgg.findOneAndUpdate(
        { userId, state: "hatching" },
        { $inc: { currentStep: steps } }, // currentStep 값을 steps만큼 증가
        { new: true } // 업데이트된 데이터 반환
      );

      if (!userEgg)
        return res.status(404).json({ message: "Egg not found for user" });

      res.json({ type: "success", message: "Egg updated", data: userEgg });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  getHatchery: async (req, res) => {
    try {
      const hatchery = await Hatchery.find();
      return res.json({
        type: "success",
        data: hatchery,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  },
};
