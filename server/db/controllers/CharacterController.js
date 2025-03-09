const Character = require("../models/Character");
const User = require("../models/User");

module.exports = {
  createCharacter: async (req, res) => {
    const character = new Character(req.body);
    await character.save();
    return character;
  },
  getCharacters: async (userId) => {
    try {
      const user = await User.findById(userId);

      if(!user) return [];

      // const characters = await Character.find();
      const characters = user.characterList.map((c)=> c.characterId);
      return await Character.find({ _id: { $nin: characters } });
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  },
  updateCharacter: async (req, res) => {
    const character = await Character.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      {
        new: true,
      }
    );
    if (!character) {
      return res.status(400).json({
        type: "error",
        message: "Character searching failed",
      });
    }
    return character;
  },
  deleteCharacter: async (req, res) => {
    const result = await Character.findOneAndDelete({ _id: req.params.userId });
    if (!result) {
      return res.status(400).json({
        type: "error",
        message: "Character searching failed",
      });
    }
    return { message: "Character deleted" };
  },
};
