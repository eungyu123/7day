const Egg = require("../models/Egg");

module.exports = {
  createEgg: async (req, res) => {
    const egg = new Egg(req.body);
    await egg.save();
    return egg;
  },
  getEggs: async (req, res) => {
    const eggs = await Egg.find();
    if (!eggs) {
      return res.status(400).json({
        type: "error",
        message: "Egg searching failed",
      });
    }
    return eggs;
  },
  updateEgg: async (req, res) => {
    const egg = await Egg.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      {
        new: true,
      }
    );
    if (!egg) {
      return res.status(400).json({
        type: "error",
        message: "Egg searching failed",
      });
    }
    return egg;
  },
  deleteEgg: async (req, res) => {
    const result = await Egg.findOneAndDelete({ _id: req.params.userId });
    if (!result) {
      return res.status(400).json({
        type: "error",
        message: "Egg searching failed",
      });
    }
    return { message: "Egg deleted" };
  },
};
