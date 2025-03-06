const WalkData = require("../models/WalkData");

module.exports = {
  createWalkData: async (req, res) => {
    const walkData = new WalkData({
      userId: req.params.userId,
      date: req.body.date,
      steps: 0,
    });
    await walkData.save();
    return walkData;
  },
  getWalkData: async (req, res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const walkData = await WalkData.find(
      {
        userId: req.params.userId,
        date: { $gte: startDate, $lte: endDate },
      },
      { _id: 0, __v: 0 }
    );
    return walkData;
  },
  updateWalkData: async (req, res) => {
    try {
      const walkData = await WalkData.findOneAndUpdate(
        {
          userId: req.params.userId,
          date: {
            $gte: req.body.startDay,
            $lte: req.body.endDay,
          },
        },
        { steps: req.body.steps },
        {
          new: true,
        }
      );
      if (!walkData) {
        const now = new Date().toISOString();
        // walkData가 없으면 새로 생성
        const newWalkData = new WalkData({
          userId: req.params.userId,
          date: now,
          steps: req.body.steps,
        });
        await newWalkData.save();
        return res.status(200).json(newWalkData); // 새로 생성된 데이터 반환
      }
      return walkData;
    } catch (error) {
      return res.status(400).send({ message: "WalkData not found" });
    }
  },
  deleteWalkData: async (req, res) => {
    await WalkData.findOneAndDelete({
      userId: req.params.userId,
      date: req.body.date,
    });
    return { message: "WalkData deleted" };
  },
};
