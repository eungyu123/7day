const models = require("../models/index");
const { Walk } = models;

module.exports = {
  //Walk 생성
  createWalk: async (req, res) => {
    const walk = new Walk({
      userId: req.params.userId,
      date: req.body.date,
      steps: 0,
    });
    await walk.save();
    return walk;
  },
  getWalk: async (req, res) => {
    const startDate = req.body.startDate;
    let endDate = req.body.endDate;

    // endDate를 23:59:59로 설정
    endDate = new Date(endDate);
    endDate.setHours(23, 59, 59, 999); // 23:59:59.999로 설정

    //date가 startDate와 endDate 사이에 있는 Walk를 반환
    const walk = await Walk.find(
      {
        userId: req.params.userId,
        date: { $gte: startDate, $lte: endDate },
      },
      { _id: 0, __v: 0 }
    );
    if (!walk) {
      return res.status(400).json({
        type: "error",
        message: "Walk searching failed",
      });
    }
    return walk;
  },
  updateWalk: async (req, res) => {
    try {
      //req에서 오늘 날짜의 startDay,endDay를 body포함하여 오늘 날짜의 Walk 업데이트
      const walk = await Walk.findOneAndUpdate(
        {
          userId: req.params.userId,
          date: {
            $gte: req.body.startDay,
            $lte: req.body.endDay,
          },
        },
        { $inc: { steps: req.body.steps } },
        {
          new: true,
        }
      );
      if (!walk) {
        const now = new Date().toISOString();
        // Walk가 없으면 새로 생성
        const newWalk = new Walk({
          userId: req.params.userId,
          date: now,
          steps: req.body.steps,
        });
        await newWalk.save();
        return res.status(200).json(newWalk); // 새로 생성된 데이터 반환
      }
      return walk;
    } catch (error) {
      return res.status(400).send({ message: "Walk not found" });
    }
  },
  deleteWalk: async (req, res) => {
    const result = await Walk.findOneAndDelete({
      userId: req.params.userId,
      date: req.body.date,
    });
    if (!result) {
      res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    return { message: "Walk deleted" };
  },
};
