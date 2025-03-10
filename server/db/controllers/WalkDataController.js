const WalkData = require("../models/WalkData");

module.exports = {
  //WalkData 생성
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
    let endDate = req.body.endDate;

    // endDate를 23:59:59로 설정
    endDate = new Date(endDate);
    endDate.setHours(23, 59, 59, 999); // 23:59:59.999로 설정

    //date가 startDate와 endDate 사이에 있는 walkdata를 반환
    const walkData = await WalkData.find(
      {
        userId: req.params.userId,
        date: { $gte: startDate, $lte: endDate },
      },
      { _id: 0, __v: 0 }
    );
    if (!walkData) {
      return res.status(400).json({
        type: "error",
        message: "walkData searching failed",
      });
    }
    return walkData;
  },
  getTodayWalkData: async (req, res) => {
    console.log("getTodatWalkDatacontroller");
    const today = new Date();
    const startDate = new Date(today.setHours(0, 0, 0, 0));
    // 오늘 날짜의 끝 시간 (23:59:59)
    const endDate = new Date(today.setHours(23, 59, 59, 999));
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
      //req에서 오늘 날짜의 startDay,endDay를 body포함하여 오늘 날짜의 walkData 업데이트
      const walkData = await WalkData.findOneAndUpdate(
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
    const result = await WalkData.findOneAndDelete({
      userId: req.params.userId,
      date: req.body.date,
    });
    if (!result) {
      res.status(400).json({
        type: "error",
        message: "Mission searching failed",
      });
    }
    return { message: "WalkData deleted" };
  },
};
