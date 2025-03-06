const {
  updateWalkData,
  getWalkData,
} = require("../db/controllers/WalkDataController");

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
      res.status(500).json({ error: "Failed to fetch data" });
    }
  },
  updateStep: async (req, res) => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // 오늘의 시작 시간 (00:00:00)
      req.body.startDay = startOfDay;
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // 오늘의 끝 시간 (23:59:59)
      req.body.endDay = endOfDay;
      const walkData = await updateWalkData(req, res);
      res.status(200).json({
        type: "success",
        message: "WalkData updated",
        data: walkData,
      });
    } catch (error) {
      res.status(500).json({
        type: "error",
        message: "fetching update failed",
      });
    }
  },
};
