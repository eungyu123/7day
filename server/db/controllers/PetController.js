const Pet = require("../models/Pet");

module.exports = {
  createPet: async (req, res) => {
    const pet = new Pet(req.body);
    await pet.save();
    return pet;
  },
  getPets: async (req, res) => {
    const pets = await Pet.find();
    return pets;
  },
  updatePet: async (req, res) => {
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      {
        new: true,
      }
    );
    return pet;
  },
  deletePet: async (req, res) => {
    await Pet.findOneAndDelete({ _id: req.params.userId });
    return { message: "Pet deleted" };
  },
};
