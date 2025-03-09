const Pet = require("../models/Pet");
const User = require("../models/User");

module.exports = {
  buyPet: async (userId, petId) => {
    try {
      const user = await User.findById(userId);
      const pet = await Pet.findById(petId);

      if(!user) throw new Error("존재X 유저");
      if(!pet) throw new Error("존재X 펫펫");

      if(user.userPoint < pet.price) throw new Error("포인트 부족");

      user.userPoint -= pet.price;
      user.petList.push({petId: pet._id});
      await user.save();
      return user;
    } catch(error) {
      throw error;
    }
  },
  createPet: async (req, res) => {
    const pet = new Pet(req.body);
    await pet.save();
    return pet;
  },
  getPets: async (userId) => {
    try {
      const user = await User.findById(userId);

      if(!user) return [];

      const pets = user.petList.map((p)=> p.petId);
      return await Pet.find({ _id: { $nin: pets } });
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
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
