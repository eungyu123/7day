const { Egg, UserEgg, Hatchery } = require("../db/models/Egg");
const User = require("../db/models/User");
const Pet = require("../db/models/Pet")
const Log = require("../db/models/Log")
module.exports = {
  getEgg: async (req, res) => {
    try {
      const { eggId } = req.body;
      const egg = await Egg.findById(eggId);
      console.log("egg", egg);
      res.json({ type: "success", data: egg });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  },
  getUserEgg: async (req, res) => {
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
  
  hatchEgg: async(req,res) => {
    try {
      // 유저와 해당 알을 찾기
      const { userId } = req.params; 
      const { eggId } = req.body; 
      const userEgg = await UserEgg.findOne({ userId, eggId });
      const user = await User.findById(userId);
      if (!userEgg) {
        return res.status(404).json({ type: "error", message: "Egg not found" });
      }
      if (!user) {
        return res.status(404).json({ type: "error", message: "User not found" });
      }
    
      // 목표 걸음 수를 초과하면 알 삭제 및 펫 지급
      if (userEgg.currentStep >= userEgg.goalWalk || true) {
        await UserEgg.deleteOne({ _id: userEgg._id }); // 알 삭제
        let randomPet;

        const pets = await Pet.find(); // 전체 펫 목록 가져오기
        if (pets.length === 0) {
          return res.status(500).json({ type: "error", message: "No pets available" });
        }

        const availablePets = pets.filter(
          (pet) => !user.petList.some((userPet) => userPet.petId === pet._id)
        )
        if (availablePets.length > 0) {
          randomPet = availablePets[Math.floor(Math.random() * availablePets.length )]
          user.petList.push({
            petId: randomPet._id,
            petName: randomPet.petName,
            price: randomPet.price,
            petLink: randomPet.petLink,
          });
        }  
        // 유저 펫 목록에 추가

        const updatedUser = await user.save(); // 변경 사항 저장
        const log = new Log({ userId, logType:"pet", logContent: randomPet.petLink });
        const newLog = await log.save();
        console.log(newLog)
        console.log(randomPet); 
        return res.json({ type: "success", data: randomPet });
      } else {
        return res.json({ type: "error", message: "걸음수 부족" });
      }
    } catch (error) {
      return res.status(500).json({ type: "error", message: "Internal server error" });
    }
}
}
