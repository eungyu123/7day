const models = require("../db/models");
const { Trail, UserTrail, Landmark } = models;
const { handleDatabaseError, handleServerError } = require("../utils/utils");

const {
  getCharacters,
  purchaseCharacter,
} = require("../db/controllers/CharacterController");
const { getPets, purchasePet } = require("../db/controllers/PetController");

module.exports = {
  getStore: async (req, res) => {
    try {
      const { userId } = req.params;
      const allCharacters = await models.Character.find();
      const userCharacters = await models.UserCharacter.find({ userId });
      const ownedCharacterIds = userCharacters.map((uc) =>
        uc.characterId.toString()
      );
      const unowendCharacters = allCharacters.filter(
        (character) => !ownedCharacterIds.includes(character._id.toString())
      );

      const allPets = await models.Pet.find();
      const userPets = await models.UserPet.find({ userId });
      const ownedPetIds = userPets.map((up) => up.characterId.toString());
      const unownedPets = allPets.filter(
        (pet) => !ownedPetIds.includes(pet._id.toString())
      );
      return res.json({
        type: "success",
        data: { characters: unowendCharacters, pets: unownedPets },
      });
    } catch (error) {
      return handleServerError(req, res);
    }
  },
  buyCharacter: async (req, res) => {
    try {
      const { userId, characterId } = req.body;

      const user = await models.User.findById(userId);
      const character = await models.Character.findById(characterId);
      if (!user || !character) return handleDatabaseError(req, res);
      if (user.userPoint < character.price) {
        return res
          .status(400)
          .json({ type: "error", message: "포인트가 부족합니다" });
      }

      const existingCharacter = await models.UserCharacter.findOne({
        userId,
        characterId,
      });
      if (existingCharacter) {
        return res
          .status(400)
          .json({ type: "error", message: "이미 보유한 캐릭터 입니다." });
      }

      user.userPoint = user.userPoint - character.price;

      const newUserCharacter = new models.UserCharacter({
        userId,
        characterId,
        characterName: character.name,
        price: character.price,
        characterLink: character.characterLink,
      });

      await user.save();
      const updatedUserCharacter = await newUserCharacter.save();

      res.status(200).json({
        type: "success",
        message: "캐릭터를 성공적으로 구매했습니다.",
        data: updatedUserCharacter,
        userPoint: user.userPoint,
        newCharacter: newUserCharacter,
      });
    } catch (error) {
      return handleServerError(req, res);
    }
  },
  buyPet: async (req, res) => {
    try {
      const { userId, petId } = req.body;
      const user = await models.User.findById(userId);
      const pet = await models.Pet.findById(petId);
      if (!user || !pet) return handleDatabaseError(req, res);
      if (user.userPoint < pet.price) {
        return res
          .status(400)
          .json({ type: "error", message: "포인트가 부족합니다" });
      }

      const existingPet = await models.UserPet.findOne({
        userId,
        petId,
      });

      if (existingPet) {
        return res
          .status(400)
          .json({ type: "error", message: "이미 보유한 캐릭터 입니다." });
      }

      user.userPoint = user.userPoint - pet.price;

      const newUserPet = new models.UserPet({
        userId,
        petId,
        petName: pet.petName,
        price: pet.price,
        petLink: pet.petLink,
      });

      const updatedUser = await user.save();
      const updatedUserPet = await newUserPet.save();

      res.status(200).json({
        type: "success",
        message: "펫을 성공적으로 구매했습니다.",
        data: updatedUserPet,
        user: updatedUser,
        pet: updatedUserPet,
      });
    } catch (error) {
      return handleServerError(req, res);
    }
  },
};
