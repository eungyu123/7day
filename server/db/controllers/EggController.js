const Egg = require("../models/Egg");

exports.createEgg = async (req, res) => {
  const egg = new Egg(req.body);
  await egg.save();
  res.send(egg);
};

exports.getEggs = async (req, res) => {
  const eggs = await Egg.find();
  res.send(eggs);
};
