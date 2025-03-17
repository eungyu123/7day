// 구글 로그인 + 닉네임 설정

const { getCharacters } = require("../db/controllers/CharacterController");
const { createUser } = require("../db/controllers/UserController"); // require로 가져오기
const { createWalkData } = require("../db/controllers/WalkDataController");
const Reward = require("../db/models/Reward");
const User = require("../db/models/User");
const Character = require("../db/models/Character");
const Pet = require("../db/models/Pet");

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = await createUser(req, res);
      const now = new Date();
      req.params.userId = user._id;
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

  getReward: async (req, res) => {
    try {
      const { rewardId } = req.body;
      const rewards = await Reward.find();
      console.log("rewardId", rewardId);

      const reward = await Reward.findById(rewardId);
      console.log("reward", reward);
      return res.json({ type: "success", data: reward });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        type: "error",
      });
    }
  },

  getRewards: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      const rewards = await Promise.all(
        user.rewardList.map((rewardId) => Reward.findById(rewardId))
      );

      // user.rewardList = [];
      // await user.save();
      return res.json({ type: "success", data: rewards });
    } catch (error) {
      return res.status(500).json({ type: "error", message: error.message });
    }
  },

  updatePetName: async (req, res) => {
    try {
      const a = await User.deleteOne({ googleId: "100889605590161340074" });
      console.log(a);
      return res.json({ a });
      // const character = await Character.find();
      // const pets = await Pet.find();

      // for (const pet of pets) {
      //   const newName = nameTranslations[pet.petName];
      //   if (newName) {
      //     await Pet.updateOne({ _id: pet._id }, { petName: newName });
      //     console.log(`Updated ${pet.petName} -> ${newName}`);
      //   }
      // }
      // const updatedpets = await Pet.find();

      // return res.json({ character, updatedpets });
    } catch (error) {
      return res.json({ type: "error" });
    }
  },
};

const nameTranslations = {
  GreenChubby: "초록뚱이",
  peach: "복숭아",
  chick: "병아리",
  cat: "고양이",
  babyGhost: "아기유령",
  lion: "사자",
  cookie: "쿠키",
  ghost: "유령",
  rabbit: "토끼",
};
