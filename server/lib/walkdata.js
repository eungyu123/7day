const {
  updateWalkData,
  getWalkData,
  getTodayWalkData,
} = require("../db/controllers/WalkDataController");

const Walk = require("../db/models/WalkData");
module.exports = {
  getStep: async (req, res) => {
    try {
      const walkData = await getWalkData(req, res);
      res.status(200).json({
        type: "success",
        message: "WalkData found",
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        stepRecords: walkData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch data" });
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
