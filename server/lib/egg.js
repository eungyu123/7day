const Egg = require("../db/models/Egg");

module.exports = {
  getEgg: async (req, res) => {
    try {
      const { userId } = req.params;
      const egg = Egg.findById(userId);
      return res.json({ type: "success", data: egg });
    } catch (error) {}
  },
  updateEgg: async (req, res) => {},
  eggHatch: async (req, res) => {},
};
