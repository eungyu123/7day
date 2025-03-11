const models = require("../db/models");
const { User } = models;
const { handleDatabaseError, handleServerError } = require("../utils/utils");

const {
  updateUser,
  getUserCharacters,
  getUserPets,
} = require("../db/controllers/UserController"); // require로 가져오기

module.exports = {
  getInventory: async (req, res) => {
    try {
      const { userId } = req.params;
      const userCharacters = models.UserCharacter.find({ userId });
      const userPets = models.UserPet.find({ userId });
      if (!userCharacters || !userPets) {
        return handleDatabaseError(req, res);
      }

      res.status(200).json({
        type: "success",
        data: {
          characterItems: userCharacters,
          petItems: userPets,
        },
      });
    } catch (error) {
      return handleServerError(req, res);
    }
  },
};
