const CharacterController = require("../db/controllers/CharacterController");
const PetController = require("../db/controllers/PetController");

module.exports = {
  getStore: async (req, res) => {
    try {
      const characterList = await CharacterController.getCharacterList();
      const petList = await PetController.getPetList();
      res.status(200).json({
        type: "success",
        message: "Store found",
        data: {
          characterList,
          petList,
        },
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching store failed",
      });
    }
  },
};
