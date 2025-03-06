const Character = require("../models/Character");

module.exports = {
  createCharacter: async (req, res) => {
    const character = new Character(req.body);
    await character.save();
    return character;
  },
  getCharacters: async (req, res) => {
    const characters = await Character.find();
    if (!characters) {
      return res.status(400).json({
        type: "error",
        message: "Character searching failed",
      });
    }
    return characters;
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
