const Pet = require("../models/Pet");

exports.createPet = async (req, res) => {
  const pet = new Pet(req.body);
  await pet.save();
  res.send(pet);
};

exports.getPets = async (req, res) => {
  const pets = await Pet.find();
  res.send(pets);
};
