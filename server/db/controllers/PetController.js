const Pet = require("../models/Pet");

module.exports = {
  createPet: async (req, res) => {
    const pet = new Pet(req.body);
    await pet.save();
    return pet;
  },
  getPets: async (req, res) => {
    const pets = await Pet.find();
    if (!pets) {
      return res.status(400).json({
        type: "error",
        message: "Pet searching failed",
      });
    }
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
    if (!pet) {
      return res.status(400).json({
        type: "error",
        message: "Pet searching failed",
      });
    }
    return pet;
  },
  deletePet: async (req, res) => {
    const result = await Pet.findOneAndDelete({ _id: req.params.userId });
    if (!result) {
      return res.status(400).json({
        type: "error",
        message: "Pet searching failed",
      });
    }
    return { message: "Pet deleted" };
  },
};
