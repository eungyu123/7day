const Character = require("../models/Character");

exports.createCharacter = async (req, res) => {
  const character = new Character(req.body);
  await character.save();
  res.send(character);
};

exports.getCharacters = async (req, res) => {
  const characters = await Character.find();
  res.send(characters);
};
