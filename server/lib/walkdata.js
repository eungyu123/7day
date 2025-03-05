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
      const now = new Date();
      req.body.date = now.tolocaleDateString("ko-KR");
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
