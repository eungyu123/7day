const Character = require("../models/Character");

module.exports = {
  createCharacter: async (req, res) => {
    const character = new Character(req.body);
    await character.save();
    return character;
  },
  getCharacters: async (req, res) => {
    const characters = await Character.find();
    return characters;
  },
  updateCharacter: async (req, res) => {
    const character = await Character.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    return character;
  },
  deleteCharacter: async (req, res) => {
    await Character.findOneAndDelete({ _id: req.params.id });
    return { message: "Character deleted" };
  },
};
