const {getCharacters} = require("../db/controllers/CharacterController");
const {getPets} = require("../db/controllers/PetController");

module.exports = {
  getStore: async (req, res) => {
    try {
      const userId = req.params.userId;
      const characters = await getCharacters(userId);
      const pets = await getPets(userId);
      
      res.status(200).json({
        type: "success",
        message: "Store found",
        characters: characters,
        pets: pets,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching store failed",
      });
    }
  },
};
