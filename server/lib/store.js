const CharacterController = require("../db/controllers/CharacterController");
const {getCharacters, buyCharacter} = require("../db/controllers/CharacterController");
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
  buyCharacter: async (req, res) => {
    try {
      const userId = req.params.userId;
      const characterId = req.params.characterId;

      const user = await CharacterController.buyCharacter(userId, characterId);

      res.status(200).json({
        type: "success",
        message: "Character purchased",
        data: user,
      });
    }  catch (error) {
      res.status(400).json({ type: "error", message: error.message });
    }
  },  
  buyPet: async (req, res) => {
    try {
      const userId = req.params.userId;
      const petId = req.params.petId;
      const user = await PetController.buyPet(userId, petId);
      res.status(200).json({
        type: "success",
        message: "Pet purchased",
        data: user,
      });
    } catch (error) {
      res.status(400).json({ type: "error", message: error.message });
    }
  },

};
