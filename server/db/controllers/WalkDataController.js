const WalkData = require("../models/WalkData");

exports.createWalkData = async (req, res) => {
  const walkData = new WalkData(req.body);
  await walkData.save();
  res.send(walkData);
};

exports.getWalkDatas = async (req, res) => {
  const walkDatas = await WalkData.find();
  res.send(walkDatas);
};
