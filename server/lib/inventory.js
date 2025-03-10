const {
  updateUser,
  getUserCharacters,
  getUserPets,
} = require("../db/controllers/UserController"); // require로 가져오기
const { findById } = require("../db/models/Mission");

module.exports = {
  updateUser: async (req, res) => {
    try {
      const user = await updateUser(req, res);
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
