const models = require("../db/models");
const { Walk } = models;
const { handleDatabaseError, handleServerError } = require("../utils/utils");

module.exports = {
  getStep: async (req, res) => {
    try {
      let startDate = req.body.startDate;
      startDate = new Date(startDate);
      startDate.setHours(0, 0, 0, 0);
      let endDate = req.body.endDate;
      endDate = new Date(endDate);
      endDate.setHours(23, 59, 59, 999);

      //date가 startDate와 endDate 사이에 있는 Walk를 반환
      const walkData = await Walk.find(
        {
          userId: req.params.userId,
          date: { $gte: startDate, $lte: endDate },
        },
        { _id: 0, __v: 0 }
      );

      if (!walkData) {
        return handleDatabaseError(req, res);
      }

      res.status(200).json({
        type: "success",
        stepRecords: walkData,
      });
    } catch (error) {
      return handleServerError(req, res);
    }
  },

  updateDailyWalkData: async (req, res) => {
    try {
      const { userId } = req.params;
      const { steps } = req.body;

      if (!steps || typeof steps !== "number" || steps < 0) {
        return res
          .status(400)
          .json({ type: "error", message: "Invalid steps value" });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const koreanTime = new Date(today.getTime() + 9 * 60 * 60 * 1000);
      console.log(koreanTime);

      const result = await Walk.findOneAndUpdate(
        { userId: userId, date: koreanTime }, // 조건: googleId + 오늘 날짜
        { $inc: { steps } }, // steps 값 증가
        { new: true, upsert: true } // 없으면 새로 생성
      );
      console.log(result);

      res.status(200).json({ type: "success", data: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ type: "error", message: "서버 오류", error });
    }
  },
};
