const Egg = require("../models/Egg");

module.exports = {
  createEgg: async (req, res) => {
    const egg = new Egg(req.body);
    await egg.save();
    return egg;
  },
  getEggs: async (req, res) => {
    const eggs = await Egg.find();
    return eggs;
  },
  updateEgg: async (req, res) => {
    const egg = await Egg.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    return egg;
  },
  deleteEgg: async (req, res) => {
    await Egg.findOneAndDelete({ _id: req.params.id });
    return { message: "Egg deleted" };
  },
};
