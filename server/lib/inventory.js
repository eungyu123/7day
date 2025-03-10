const User = require("../db/models/User");
// const { updateUser } = require("../db/controllers/UserController"); // require로 가져오기
const {
  updateUser,
  getUserCharacters,
  getUserPets,
} = require("../db/controllers/UserController"); // require로 가져오기
const { findById } = require("../db/models/Mission");

module.exports = {
  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const { newCharacter, newPet } = req.body;

      // 캐릭터, 펫 리스트 업데이트 후 사용자 가져오기
      await updateUser(userId, { newCharacter, newPet });
      const user = await User.findById(userId);

      res.status(200).json({
        type: "success",
        message: "Inventory updated",
        data: {
          characterList: user.characterList,
          petList: user.petList,
        },
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "Inventory update failed",
      });
    }
  },
  getInventory: async (req, res) => {
    try {
      const characters = await getUserCharacters(req, res);
      const pets = await getUserPets(req, res);
      res.status(200).json({
        type: "success",
        message: "Inventory found",
        data: {
          characterItems: characters,
          petItems: pets,
        },
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "Inventory not found",
      });
    }
  },
};
